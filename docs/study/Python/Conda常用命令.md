

## 环境管理：

- 创建环境：`conda create -n deep_learning python=3.10`
- 激活环境：`conda activate myenv`
- 查看环境：`conda env list`
- 删除环境：`conda remove --name myenv --all`

## 包管理：

- 安装包：`conda install numpy`
- 更新包：`conda update numpy`
- 卸载包：`conda remove numpy`
- 查看包：`conda list`

## 环境导出与克隆：

- 导出环境：`conda env export > environment.yml`
- 创建环境：`conda env create -f environment.yml`
- 克隆环境：`conda create --name newenv --clone oldenv`

## 搜索与查看：

- 搜索包：`conda search numpy`
- 查看配置信息：`conda info`

## 更换镜像源

```bash
# 清空原有默认源
conda config --remove-key channels

# 添加清华镜像源（国内最快）
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/

# 设置搜索时显示通道地址
conda config --set show_channel_urls yes
```

验证是否生效

```bash
#  显示清华源地址就说明成功了
conda config --show channels
```

