# vip_cms_vue
Project Readme

需求合作开发从dev检出新分支开发，需求开发完后发布j-one预发服务器进行预览

master只能从dev测试通过后进行合并后发布！

j-one发布前进行抽包配置版本号然后发布最新版本，如发布后出现遇线上bug直接修改抽包进行覆盖式上线

# 项目构建
#### 打包之前需要安装的插件
+ prettier 用来格式化代码，[webstorm配置](https://www.yuque.com/xudong/gkhpg3/gancb2)

#### package.json中的script
1. 本地调试：`npm run serve`
2. 预发打包：`npm run buildDev`
3. 线上打包：`npm run build`

###在commit时需要注意： 使用项目中的约定提交。示例： `git commit -m"feat: 本次提交内容"`，其他命令有：

+ build  当打包时使用
+ chore  杂项时使用
+ ci  自动化脚本时使用
+ docs  编写文档时使用
+ feat  新增功能时使用
+ fix   修复bug时使用
+ perf  优化代码时使用
+ refactor  重构代码时使用
+ style  更改css样式时使用

### 别名使用
+ @ =====> /src
+ assets =====> /src/assets
+ components =====> /src/components
+ @U =====> /src/utils
+ api =====> /src/servers

### 封装Table

+ @/common/Table

使用说明：
```
<Table :data="tableData" :label="labelArr" :total="100" @currPage="pageChange" v-mode="page">
    //如需某列需要自定义可控添加如下代码，《address》注意和labelArr进行匹配
    <template slot="address" slot-scope="item">
      <div>{{ item.scope.row["address"] }}</div>
      <div>{{ item.scope.row["address"] }}</div>
    </template>
    <el-table-column label="操作" width="100" fixed="right">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
</Table>
:total===> 分页功能总条数
@currPage=====> 当前页数回调
v-model ====> 双向绑定page
label =======> 表头数组配置详情如下：
labelArr: [
    {
      label: "日期", //表头名
      key: "date", // 对应表头key
      fixed: true, // 当前列是否固定
      width: "50px" //当前列宽
    },
    {
      label: "地址",
      key: "address",
      solt: "address" //自定义列
    }
],

```
+ @/common/RuleModel.vue

规则集 后端下发组件类型渲染模型组件使用方法如下

<RuleModel ref="rules" :tdata="triggerData" v-if="triggerData" :only-read="true"></RuleModel>

```
triggerData：下发json，格式如mock/rule.json
onlyRead: 表单是否只读状态
表单提交校验方式如下：
if (this.$refs.rules) {
 const promiseList = []
 this.$refs.rules.forEach(item => {
   promiseList.push(item.validate())
 })
 Promise.all(promiseList)
   .then(res => {
     console.log(res)
   })
   .catch(err => {
     console.log(err)
   })
}
```


+ 后端下发模型结构提交时格式化方法

let arr = ruleGroup(data)

// 例：

axios.get("url", { ruleOperateParams: arr})

前端tirgget 数据



+ editor 富文本编辑器（简易版）使用方法

import Editor from "@/common/Editor"

<Editor @getHtml="getHtml" ref="editor"></Editor>

getHtml事件可回调最后编辑完的html，如不在组件内触发事件可直接用：

```
this.$refs.editor.editor //获取编辑器当前内容
this.$refs.editor.setHtml("aaa") //设置内容
20190412 更新用法暂时兼容如上方法，也可直接用如下新方法更简单获取和设置值

<Editor v-model="html"></Editor>

直接实时双向绑定到引用Editor组件的this.html里 取值和设置值更简单
```

+ 上传图片组件

import ImgUpload from "@/common/ImgUpload"

<ImgUpload v-model="imageUrl"></ImgUpload>
参数说明：
```$xslt
tip: 提示语，默认：只能上传jpg/png文件，且不超过500kb
fileSize： 上传文件大小限制MB 默认：2
fileType： 上传图片类型限制 默认：["jpeg", "gif", "png"]
maxWidth： 图片最大宽度限制 默认：500
maxHeight： 图片最大高度限制 默认：500
limit： 最多上传数 默认：1 //暂时未做多文件上传兼容
disabled: 不可编辑状态 
优化上传成功和直接回值问题直接可取用this.imageUrl 取值和设值

```


