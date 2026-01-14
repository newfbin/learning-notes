package com.newfbin;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * 自动生成docs/study目录下的README.md和sidebar.md <br>
 * 自动生成docs目录下index.html中的搜素插件的索引路径
 */
public class DocsGenerator {
    private static final String ROOT = "docs";
    private static final String STUDY_ROOT = ROOT + "/study";
    // index.html的路径：study的父目录下
    private static final Path INDEX_HTML_PATH = Paths.get(ROOT).resolve("index.html");

    public static void main(String[] args) throws IOException {
        generateStudyDocs();                // 自动生成docs/study目录下的README.md和sidebar.md
        generateIndexHtmlSearchPaths();     // 自动生成docs目录下index.html中的搜素插件的索引路径
    }

    private static void generateStudyDocs() throws IOException {
        try (Stream<Path> paths = Files.walk(Paths.get(STUDY_ROOT))) {
            paths.filter(Files::isDirectory)
                    .forEach(dir -> {
                        try {
                            if (shouldSkip(dir)) return;
                            if (isStudyRoot(dir)) {
                                generateStudyRootReadme(dir);
                                generateStudyRootSidebar(dir);
                            } else {
                                generateStudyReadme(dir);
                                generateStudySidebar(dir);
                            }
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    });
        }
    }

    private static boolean isStudyRoot(Path dir) {
        return dir.equals(Paths.get(STUDY_ROOT));
    }

    private static void generateStudyRootReadme(Path dir) throws IOException {
        List<Path> items = getStudyRootItems();
        String itemsContent = items.stream()
                .map(item -> {
                    if (Files.isDirectory(item)) {
                        return "*  [" + item.getFileName().toString() + "](/study/" + item.getFileName().toString() + "/README)";
                    } else {
                        String fileName = item.getFileName().toString().replace(".md", "");
                        return "*  [" + fileName + "](/study/" + fileName + ")";
                    }
                })
                .collect(Collectors.joining("\n"));
        String content = "#  导读\n\n> [newfbin的学习笔记](/study/README)\n\n" +
                "该项目用于记录个人学习笔记，有部分内容来自图书、博客、论坛等。\n\n" +
                "如有**侵权**等问题，请联系fubinniu@gmail.com，本人会第一时间删除相关内容。\n\n## 目录\n\n" +
                itemsContent;
        writeFile(dir.resolve("README.md"), content);
    }

    private static void generateStudyRootSidebar(Path dir) throws IOException {
        List<Path> items = getStudyRootItems();
        String itemsContent = items.stream()
                .map(item -> {
                    if (Files.isDirectory(item)) {
                        return "  * [**" + item.getFileName().toString() + "**](/study/" + item.getFileName().toString() + "/README)";
                    } else {
                        String fileName = item.getFileName().toString().replace(".md", "");
                        return "  * [**" + fileName + "**](/study/" + fileName + ")";
                    }
                })
                .collect(Collectors.joining("\n"));
        String content = "* 导读\n" + itemsContent + "\n  * 持续更新中...";
        writeFile(dir.resolve("_sidebar.md"), content);
    }

    private static void generateStudyReadme(Path dir) throws IOException {
        String title = dir.getFileName().toString();
        String content = "#  " + title + "\n\n## 目录\n\n" +
                getDirectoryItems(dir).stream()
                        .map(item -> formatLink("readme", item))
                        .collect(Collectors.joining("\n"));
        writeFile(dir.resolve("README.md"), content);
    }

    private static void generateStudySidebar(Path dir) throws IOException {
        Path relativePath = Paths.get(STUDY_ROOT).relativize(dir);
        String parentLink = relativePath.getParent() != null ?
                "  * [⬆️（返回）](/study/" + relativePath.getParent().toString().replace("\\", "/") + "/README)\n" : "";

        String content = "* **目录**\n" +
                "  * [🏠（起点）](/study/README)\n" +
                parentLink +
                getDirectoryItems(dir).stream()
                        .map(item -> formatLink("sidebar", item))
                        .collect(Collectors.joining("\n"));
        writeFile(dir.resolve("_sidebar.md"), content);
    }

    private static List<Path> getStudyRootItems() throws IOException {
        try (Stream<Path> stream = Files.list(Paths.get(STUDY_ROOT))) {
            return stream.filter(path -> !isSpecialFile(path))
                    .sorted(Comparator.comparing(p -> p.getFileName().toString()))
                    .collect(Collectors.toList());
        }
    }

    private static List<Path> getDirectoryItems(Path dir) throws IOException {
        try (Stream<Path> stream = Files.list(dir)) {
            return stream.filter(path -> !isSpecialFile(path))
                    .sorted(Comparator.comparing(p -> p.getFileName().toString()))
                    .collect(Collectors.toList());
        }
    }

    private static String formatLink(String type, Path item) {
        String name = item.getFileName().toString().replace(".md", "");
        String relativePath = Paths.get(STUDY_ROOT).relativize(item).toString().replace("\\", "/");
        String link = Files.isDirectory(item) ? "/study/" + relativePath + "/README" : "/study/" + relativePath.replace(".md", "");
        return type.equals("readme")? String.format("  * [%s](%s)", name, link) : String.format("  * [**%s**](%s)", name, link);
    }

    private static boolean shouldSkip(Path path) {
        return path.getFileName().toString().startsWith(".") ||
                path.toString().contains("assets") ||
                path.toString().contains("media");
    }

    private static boolean isSpecialFile(Path path) {
        String fileName = path.getFileName().toString();
        boolean isSpecial = fileName.equals("README.md") ||
                fileName.equals("_sidebar.md") ||
                fileName.startsWith(".") ||
                (Files.isDirectory(path) && (fileName.contains("assets") || fileName.contains("media")));

        if (!Files.isDirectory(path) && !fileName.toLowerCase().endsWith(".md")) {
            isSpecial = true;
        }
        return isSpecial;
    }

    private static void writeFile(Path path, String content) throws IOException {
        Files.write(path, content.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * 核心方法：递归扫描/study下所有md文件，提取路径并更新index.html的search.paths配置
     * 【Java8兼容修复】替换了Files.readString 为 Java8 原生写法
     */
    private static void generateIndexHtmlSearchPaths() throws IOException {
        // 递归扫描 /study 下所有符合要求的md文件
        List<String> mdFilePaths = scanAllMdFiles();

        byte[] htmlBytes = Files.readAllBytes(INDEX_HTML_PATH);
        String originHtmlContent = new String(htmlBytes, StandardCharsets.UTF_8);

        // 生成符合格式的paths数组字符串
        String pathsArrayStr = mdFilePaths.stream()
                .map(path -> "\t\t\t'" + path + "'")
                .collect(Collectors.joining(",\n"));

        // 替换规则：精准替换 search: {} 中的 paths 属性值
        String newHtmlContent = originHtmlContent.replaceAll(
                "(search:\\s*\\{[\\s\\S]*?paths:\\s*)([^,}]+)([\\s\\S]*?\\})",
                "$1[\n" + pathsArrayStr + "\n\t\t] $3"
        );

        // 重新写入index.html，UTF-8编码
        writeFile(INDEX_HTML_PATH, newHtmlContent);
        System.out.println("✅ index.html 更新完成，共写入 "+ mdFilePaths.size() +" 个搜索路径");
    }

    /**
     * 递归扫描 /study 目录下的所有md文件
     * 过滤规则：1.排除_sidebar.md 2.排除隐藏文件 3.排除assets/media目录 4.只保留.md后缀文件
     */
    private static List<String> scanAllMdFiles() throws IOException {
        List<String> resultPathList = new ArrayList<>();
        Path studyRootPath = Paths.get(STUDY_ROOT);

        try (Stream<Path> allPaths = Files.walk(studyRootPath)) {
            resultPathList = allPaths
                    // 文件 + 以.md结尾 + 不是_sidebar.md + 不包含assets/media + 不是隐藏文件
                    .filter(path -> Files.isRegularFile(path)
                            && path.getFileName().toString().toLowerCase().endsWith(".md")
                            && !"_sidebar.md".equals(path.getFileName().toString())
                            && !shouldSkip(path)
                            && !path.getFileName().toString().startsWith("."))
                    // 按文件名排序，保证路径有序
                    .sorted(Comparator.comparing(Path::toString))
                    // 提取路径并格式化，去掉.md后缀，转为 /study/xxx/xxx 格式
                    .map(path -> {
                        String relativePath = studyRootPath.relativize(path).toString().replace("\\", "/");
                        return "/study/" + relativePath.substring(0, relativePath.lastIndexOf("."));
                    })
                    .collect(Collectors.toList());
        }
        return resultPathList;
    }
}