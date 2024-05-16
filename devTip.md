1
import chalk from 'chalk';
chalk 模块，这是一个用于在终端输出彩色文字的库，通常用于美化命令行输出

2
import fs from 'fs';
fs 用于文件系统操作
fs.existsSync 判断文件是否存在

3
import { rimrafSync } from 'rimraf';
rimraf 的同步版本 rimrafSync，用于递归删除文件或目录

使用了 { glob: true } 选项来支持通配符匹配删除
rimrafSync(path.join(webpackPaths.distRendererPath, '*.js.map'), {glob: true,}); 

4
import path from 'path';
使用了 path.join 来拼接路径

