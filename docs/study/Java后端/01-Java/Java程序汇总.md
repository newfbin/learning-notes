# 文件读写

## 向docsify项目中生成README.md与_sidebar.md

### 1.Paths.get()



### 2.Files.walk()

#### 3.paths.filter().forEach()

### 代码

```java
package com.newfbin;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class DocsGenerator {
    private static final String ROOT = "docs";
    private static final String STUDY_ROOT = ROOT + "/study";

    public static void main(String[] args) throws IOException {
        generateStudyDocs();
    }

    private static void generateStudyDocs() throws IOException {
        // 1、2
        try (Stream<Path> paths = Files.walk(Paths.get(STUDY_ROOT))) {
            // 3
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
        String content = "#  导读\n\n> [newfbin的学习笔记](https://newfbin.github.io/learning-notes/) ==> https://newfbin.github.io/learning-notes/\n\n" +
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
                        .map(item -> formatLink(dir, item))
                        .collect(Collectors.joining("\n"));
        writeFile(dir.resolve("README.md"), content);
    }

    private static void generateStudySidebar(Path dir) throws IOException {
        Path relativePath = Paths.get(STUDY_ROOT).relativize(dir);
        String parentLink = relativePath.getParent() != null ?
                "  * [⬆️（返回）](/study/" + relativePath.getParent() + "/README)\n" : "";

        String content = "* **目录**\n" +
                "  * [🏠（起点）](/study/README)\n" +
                parentLink +
                getDirectoryItems(dir).stream()
                        .map(item -> formatLink(dir, item))
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

    private static String formatLink(Path dir, Path item) {
        String name = item.getFileName().toString().replace(".md", "");
        String relativePath = Paths.get(STUDY_ROOT).relativize(item).toString().replace("\\", "/");
        String link = Files.isDirectory(item) ? "/study/" + relativePath + "/README" : "/study/" + relativePath.replace(".md", "");
        return String.format("  * [%s](%s)", name, link);
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
}
```



# 并发多线程



