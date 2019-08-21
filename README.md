# vip_cms_vue
Project Readme

需求合作开发从dev检出新分支开发，需求开发完后发布j-one预发服务器进行预览

master只能从dev测试通过后进行合并后发布,合并前修改package的version版本号，每次上线必须升级版本号！

发布前进行抽包配置版本号然后发布最新版本，如发布后出现遇线上bug直接修改抽包进行覆盖式上线

# 20190815 架构微调记录
前期打包预发和线上都放到了dist，之后版本拆分预发和线上包，保证线上包的留存；预发包全部放到devDist里独立维护，以便线上回滚到老得预发包

发布预发环境抽包地址在devDist文件夹下版本号，线上抽包地址不变dist文件下版本号

# 项目构建
#### 打包之前需要安装的插件
+ prettier 用来格式化代码，[webstorm配置](https://www.yuque.com/xudong/gkhpg3/gancb2)

#### package.json中的script

生产环境加入了dll打包优化，如果第一次跑项目请先执行`npm run dll`命令
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
<Table :data="tableData" :label="labelArr" :total="100" @currPage="pageChange" v-mode="page" check-box="true" ref="table">
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
v-mode ======> 优化当前页数双向绑定
:show-total="true"  =====> 积分福利项目需要显示总条数
check-box="true" //积分福利中加入数据行勾选功能
this.$refs.table.selected ====> 获取所有勾选数据
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

<Editor v-model="html" ref="editor" :disabled="false" max-len="5"></Editor>
直接实时双向绑定到引用Editor组件的this.html里 取值和设置值更简单
disabled 不可编辑
max-len 最大字符
编辑器字数限制校验
this.$refs.editor.validate()
.then(res => {
  console.log(res)
})
.catch(err => {
  console.log(err)
})

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
onlySize: 只能上传多大宽高的图片 默认: 空 入参only-size="'100*100'"
limit： 最多上传数 默认：1 //暂时未做多文件上传兼容
优化上传成功和直接回值问题直接可取用this.imageUrl 取值和设值

```

+ select统一配置管理（福利积分-试用）

很多select的option备选项又重复而且后期可能会添加或删除备选项问题，所以本期暂时由自己二次封装的UI组件接管，全局加入yt-option组件，使用方法如下：
```angular2html
// 配置备选项js路径：/utils/Options.js
<el-select v-model="testSelect" placeholder="全部">
  <yt-option type="test"></yt-option>//二次封装UI备选组件
</el-select>
type传入Options.js内对应的key，如test

```
+ elementUI-popover组件针对项目场景二次封装优化

  在table表单用饿了么pop组件关闭事件需要特殊处理，为了方便使用和页面整洁性进行了二次封装

  ```
  //引入二次封装组件
  import PopOver from "@/common/PopOver"
  // 使用
  <PopOver :data="scope.row" :index="scope.$index" @popSub="changeStatus" @close="" placement="默认：top" title="标题" width="默认200" trigger="默认：click">
  	<p>内容</p>
  	<el-button slot="reference" type="text" size="small">外层按钮</el-button>
  </PopOver>
  // 封装的pop配置方式完全和官方入参一致，目前支持placement,title,width,trigger；
  //二次封装增加必填属性
  	data：弹框里确认按钮回调后需要的入参
  	index：唯一key
  	popSub：二次确认弹框里确认回调入参row，index
  	close: 关闭时回调入参row，index
  ```


### 非代码规范内代码

+ vipMixin.js 建议停用
+ /src/components/power/ImgUploadPower
+ coupon、beans、power、jxzConfig里所有开发并不符合开发规范，table和上传组件都没有用通用组件，后期优化和代码修改要单独梳理修改（会员一期业务线有影响）

### TODO
+ 所有素材页面接口有待整合优化

