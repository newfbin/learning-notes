

## 环境管理：

- 创建环境：`conda create --name myenv`
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