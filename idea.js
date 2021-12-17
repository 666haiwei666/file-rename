// 如果用户配置是不是有效文件夹名，向上查找，知道根目录。
// 同一个文件夹内重命名
// 记录用户是否修改

// 单选文件
// 如果是c盘，或者占用文件（是否会修改失败）
// （1）一问一答
//  1. What is the folder of the modified file（修改文件的文件夹是什么） ： Current folder
//  2. What was the old file name（旧的文件名是什么）：  tab自动补全
//  3. What was the new file name（新的文件名是什么）：


// （2）多选文件（重复） --index

//  1. What is the folder of the modified file（修改文件的文件夹是什么） ： Current folder
//  2. Which file name do you want to start with（需要从哪份文件名开始呢）： 默认第一个
//  3. Which file name do you want to end with（需要从哪份文件名结束呢）： 默认最后一个
//  4. What is the prefix common to the file(文件公共的前缀是什么): 不能为空
//  5. Is started with 0 when the figure smaller than ten(比10小的数字是否已0开始)  true


// （3）多选文件（不重复）

//  1. Are you know rules of configuration file (是否知道配置文件规则) no
//  2. Pulling file template （正在拉取文件模板）
//  3. Please input according to the rules， Please enter when finished (请根据文件输入，完成请回车)
//  （The configuration file could not be found， Please input configuration name） 找不到配置文件，请输入配置文件名称
//  4. Modifying, please wait（正在修改，请稍等）
//  5. 修改完成


// （4）修改配置文件
// 1. Are you know rules of configuration file
// 2. Cache path  （用户目录）
// 3. Is started with 0 when the figure smaller than ten  
// 4. Default folder 数组形式

// （5）撤销修改文件 revoke   --r 最近次数
// 撤销最近一次
// 选择撤销记录


// （6）清除缓存路径 clear



// fs-extra


