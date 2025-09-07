# 02 前后端整合联调+Swagger文档

直播回放：[从 0 到 1 开发找伙伴系统（2）](https://t.zsxq.com/03vRfuneE)<font style="color:rgb(51, 51, 51);">（前端页面开发）</font>

## 鱼皮的笔记

### 本次直播内容（计划）：


1. **上次的标签接口调试** 5 min √
2. 前端整合路由 5min √
3. 前端开发（搜索页面、用户信息页、用户信息修改页）30 - 50min √
4. 后端整合 Swagger + Knife4j 接口文档 10 - 15min
5. 存量用户信息导入及同步（爬虫） 40 min



### Java 8


1. stream / parallelStream 流失处理
2. Optional 可选类



### 前端整合路由


Vue-Router：https://router.vuejs.org/zh/guide/#html，直接看官方文档引入  
Vue-Router 其实就是帮助你根据不同的 url 来展示不同的页面（组件），不用自己写 if / else  
路由配置影响整个项目，所以建议单独用 config 目录、单独的配置文件去集中定义和管理。  
有些组件库可能自带了和 Vue-Router 的整合，所以尽量先看组件文档、省去自己写的时间。



## 项目开始


### 一、上次的标签接口调试


#### 1.更改代码


上次的searchUsersByTags方法里写了两种查询方式，这次就把它们分开，写成两个方法  
整理如下



```java
/**
     * 根据标签搜索用户 - 内存查询
     * @param tagNameList 用户拥有的标签
     * @return
     */
    @Override
    public List<User> searchUsersByTags(List<String> tagNameList) {
        if (CollectionUtils.isEmpty(tagNameList)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        List<User> userList = userMapper.selectList(queryWrapper);
        Gson gson = new Gson();
        //2.在内存中判断是否包含要求的标签
        return userList.stream().filter(user -> {
            String tagsStr = user.getTags();
            if (StringUtils.isBlank(tagsStr)) {
                return false;
            }
            Set<String> tempTagNameSet = gson.fromJson(tagsStr, new TypeToken<Set<String>>() {
            }.getType());
            // Java8 Optional.ofNullable判断为空
            tempTagNameSet = Optional.ofNullable(tempTagNameSet).orElse(new HashSet<>());
            for (String tagName : tagNameList) {
                if (!tempTagNameSet.contains(tagName)) {
                    return false;
                }
            }
            return true;
        }).map(this::getSafetyUser).collect(Collectors.toList());
    }

    /**
     * 根据标签搜索用户(SQL查询) 
     * @Deprecated 过时
     * @param tagNameList
     * @return
     */
    @Deprecated
    private List<User> searchUsersByTagsBySQL(List<String> tagNameList) {
        if (CollectionUtils.isEmpty(tagNameList)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        //拼接 and 查询
        //like '%Java%' and like '%Python%'
        for (String tagName : tagNameList) {
            queryWrapper = queryWrapper.like("tags", tagName);
        }
        List<User> userList = userMapper.selectList(queryWrapper);
        return userList.stream().map(this::getSafetyUser).collect(Collectors.toList());
    }
```



#### 2.测试接口


按照上次的测试方法，打断点debug  
结果如下，成功查询到  
![1668299941538-bdede46c-b8c1-459a-b403-c43aa4aa1451.png](./assets/02前后端整合联调&Swagger文档/1668299941538-bdede46c-b8c1-459a-b403-c43aa4aa1451-297463-1729217866892-54.png)



### 二、前端整合路由


vue 路由组件库地址：



#### 1.安装命令


```plain
yarn add vue-router@4

npm install vue-router@4  建议使用npm，不会出现报错
```



我这边没有权限报错，如果有，就删掉node_modules和yarn-error.log。再次输入安装命令，成功安装  
package里的依赖要存在vue-router  
![1668301551175-bd6528ce-20fe-4098-b4cc-b3c649eec1f8.png](./assets/02前后端整合联调&Swagger文档/1668301551175-bd6528ce-20fe-4098-b4cc-b3c649eec1f8-493190-1729217866892-55.png)



#### 2.路由引入


看文档，按着步骤引用



```javascript
// 1. 定义路由组件.
// 也可以从其他文件导入
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

// 5. 创建并挂载根实例
const app = Vue.createApp({})
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)

app.mount('#app')

// 现在，应用已经启动了！
```



复制到main.ts中并修改，整理如下



```javascript
import { createApp } from 'vue'
import App from './App.vue'
import {Button, Icon, NavBar, Tabbar, TabbarItem} from 'vant';
import Index from "./pages/Index.vue";
import Team from "./pages/Team.vue";
import * as VueRouter from 'vue-router';

const app = createApp(App);
app.use(Button);
app.use(NavBar);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);

//定义一些路由
const routes = [
    { path: '/', component: Index },
    { path: '/about', component: Team },
]

const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

app.use(router)

app.mount('#app');
```



新建一个User.vue在pages目录下

![27f7ea85-deeb-464a-bf4a-b9e8ef1aa4f9](./assets/02前后端整合联调&Swagger文档/27f7ea85-deeb-464a-bf4a-b9e8ef1aa4f9-1729217924907-134.png)



> 定义的路由，即跳转的规则是全局性的，尽量提取出来，不要全部写在main.ts中



在src目录下，建立config目录和route文件，把路由的定义移动到里面，注意！不是复制！



route文件代码如下



```typescript
//定义一些路由
import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import User from "../pages/User.vue";

const routes = [
    { path: '/', component: Index },
    { path: '/Team', component: Team },
    { path: '/User', component: User },
]

export default routes;//导出
```



回到main.ts文件中，把routes引入。选中routes按alt+anter，或者手动导入  
![1668303824879-a69b5c51-72ef-464a-96c9-3a662df29bf9.png](./assets/02前后端整合联调&Swagger文档/1668303824879-a69b5c51-72ef-464a-96c9-3a662df29bf9-352613-1729217866893-56.png)



> 找到BasicLayout.vue文件，原先是利用v-if进行改变，跳转的，现在引入router-view，根据不同的页面展示不同的内容，个人理解：原先是单页面跳转，就是利用js重新渲染页面，
>
> 
>
> 而利用router-view后，是在多个页面里面进行跳转。



div 里的内容修改为如下  
![1668304227310-4e128b14-4e43-41c5-b484-ce29fcb68b05.png](./assets/02前后端整合联调&Swagger文档/1668304227310-4e128b14-4e43-41c5-b484-ce29fcb68b05-900912-1729217866893-57.png)



搭配route-link创建链接，进行测试	  


![4e87ffbb-a4e5-4cdc-bb92-8081367aabc8](./assets/02前后端整合联调&Swagger文档/4e87ffbb-a4e5-4cdc-bb92-8081367aabc8.png)

启动项目，测试一下，点击链接，发现路径是跳转的  
![1668303291495-b852c14f-f715-45f9-b2f7-44df14a64435.png](./assets/02前后端整合联调&Swagger文档/1668303291495-b852c14f-f715-45f9-b2f7-44df14a64435-911450-1729217866893-58.png)![1668303309439-386e16b4-2f1f-403a-9681-4d8b06f4c6ed.png](./assets/02前后端整合联调&Swagger文档/1668303309439-386e16b4-2f1f-403a-9681-4d8b06f4c6ed-105793-1729217866893-60.png)



这些表明框架结构已经成功搭建，vant3标签栏已经支持路由模式（正好是vue-route)  
![1668304538575-f0a8f6af-f207-4097-8367-605e9823ca30.png](./assets/02前后端整合联调&Swagger文档/1668304538575-f0a8f6af-f207-4097-8367-605e9823ca30-127047-1729217866893-59.png)



上次创建页面少创建了个人页面，现在依葫芦画瓢，创建个人页面（这个比较简单就不演示了)，注意：别忘了到route.ts中引入这个页面  
![1668304708928-7ca11f94-db35-4452-9fba-d94a850965c5.png](./assets/02前后端整合联调&Swagger文档/1668304708928-7ca11f94-db35-4452-9fba-d94a850965c5-685641-1729217866893-61.png)  
继续修改BasicLayout.vue如下  
![1668304786577-e4bed406-c729-4407-9132-355a43eea99e.png](./assets/02前后端整合联调&Swagger文档/1668304786577-e4bed406-c729-4407-9132-355a43eea99e-804887-1729217866893-62.png)



删除route-link（现在没用了，可通过标签栏跳转了)  
测试一下，结果如下  
![1668304925248-d1ae39ff-5984-4e4f-a296-d6d14e472db4.png](./assets/02前后端整合联调&Swagger文档/1668304925248-d1ae39ff-5984-4e4f-a296-d6d14e472db4-713733-1729217866893-63.png)![1668304937980-8d40e1bd-88d6-4936-89d8-7634e56d7109.png](./assets/02前后端整合联调&Swagger文档/1668304937980-8d40e1bd-88d6-4936-89d8-7634e56d7109-368025-1729217866893-64.png)



### 三、前端开发


#### 1.准备工作


首先把原先的页面名称修改下，有些会与自带的起冲突，添加searchpage页面 ，并修改其他页面名称修改如下



![1668327667856-b1af3565-9423-4229-a482-e04ec40e3dbd.png](./assets/02前后端整合联调&Swagger文档/1668327667856-b1af3565-9423-4229-a482-e04ec40e3dbd-264197-1729217866893-65.png)![1668330767686-3960953e-8595-425d-ac0e-cd37793a4c9d.png](./assets/02前后端整合联调&Swagger文档/1668330767686-3960953e-8595-425d-ac0e-cd37793a4c9d-889301-1729217866893-66.png)  
为了编写代码中的便利，把按需引入改为全部引入，在main.ts中修改代码



```typescript
import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router';
import routes from "./config/route";
import Vant from 'vant';
import 'vant/lib/index.css' // 全局引入要添加这个样式

const app = createApp(App);
app.use(Vant);

const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

app.use(router);
app.mount('#app');
```



#### 2.添加搜索框


在vant文档里找到合适的组件如下  
![1668330711096-efd078ea-e652-4549-b890-84c0ccd0f78d.png](./assets/02前后端整合联调&Swagger文档/1668330711096-efd078ea-e652-4549-b890-84c0ccd0f78d-424492-1729217866893-67.png)  
将其复制到searchpage页面里，并修改整理



```vue
<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { Toast } from 'vant';

const searchText = ref('');
const onSearch = (val) => Toast(val);
const onCancel = () => Toast('取消');

</script>

<style scoped>

</style>
```



然后做一个点击搜索按钮，跳转到搜索页面，在vue router 官方文档里有此内容，复制到BsaicLayout.vue中修改，顺便把左边的返回页面按钮也写了，使其跳转到主页  
![1668331093184-402acf52-91ba-4561-8299-33c9817d5595.png](./assets/02前后端整合联调&Swagger文档/1668331093184-402acf52-91ba-4561-8299-33c9817d5595-173676-1729217866893-68.png)  
![1668331280514-b120be51-0aad-4900-8696-249c86aec2e5.png](./assets/02前后端整合联调&Swagger文档/1668331280514-b120be51-0aad-4900-8696-249c86aec2e5-357845-1729217866893-69.png)  
测试一下，按搜索按钮  
![1668331400638-ce33f286-effe-470b-bff5-27e3b7417df6.png](./assets/02前后端整合联调&Swagger文档/1668331400638-ce33f286-effe-470b-bff5-27e3b7417df6-634596-1729217866893-70.png)![1668331423320-b47a3591-b112-45b9-bd2a-be1092aa0573.png](./assets/02前后端整合联调&Swagger文档/1668331423320-b47a3591-b112-45b9-bd2a-be1092aa0573-416879-1729217866893-71.png)![1668331442053-0185f799-cae4-45ae-9361-4baf97cd102f.png](./assets/02前后端整合联调&Swagger文档/1668331442053-0185f799-cae4-45ae-9361-4baf97cd102f-325349-1729217866893-72.png)  
按左边返回按钮  
![1668331529147-84025441-3da8-4535-af22-25cb0d33661d.png](./assets/02前后端整合联调&Swagger文档/1668331529147-84025441-3da8-4535-af22-25cb0d33661d-351172-1729217866893-73.png)![1668331542663-eac0f515-e998-491f-9e94-945377a52d2e.png](./assets/02前后端整合联调&Swagger文档/1668331542663-eac0f515-e998-491f-9e94-945377a52d2e-200915-1729217866893-74.png)



#### 3.添加，搜索，删除标签


目标是实现标签显示，包括可选标签和已选标签，所以我们要引入分割线去区分



```vue
<van-divider
  :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
>
  文字
</van-divider>
```



同时我们需要在点击搜索后，让页面显示已选标签，所以要引入tag标签



```vue
<van-tag :show="show" closeable size="medium" type="primary" @close="close">
  标签
</van-tag>
```



标签需要我们手动选择，所以也要引入选择标签组件，这边我们使用TreeSelect



```javascript
import { ref } from 'vue';

export default {
  setup() {
    const activeId = ref(1);
    const activeIndex = ref(0);
    const items = [
      {
        text: '浙江',
        children: [
          { text: '杭州', id: 1 },
          { text: '温州', id: 2 },
        ],
      },
      {
        text: '江苏',
        children: [
          { text: '南京', id: 5 },
          { text: '无锡', id: 6 },
        ],
      },
    ];

    return {
      items,
      activeId,
      activeIndex,
    };
  },
};
```



已选标签之间是挤在一起，为了美观，我们来选择Layout布局来设置间距



```vue
<van-row gutter="20">
  <van-col span="8">span: 8</van-col>
  <van-col span="8">span: 8</van-col>
  <van-col span="8">span: 8</van-col>
</van-row>
```



将上面的组件复制到SearchPage.vue并整理修改



```vue
<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length===0">请选择标签</div>
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="small" type="primary">
        {{tag}}
      </van-tag>
    </van-col>
  </van-row>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
</template>

<script setup>
import { ref } from 'vue';
import { Toast } from 'vant';

const searchText = ref('');
const onSearch = (val) => Toast(val);
const onCancel = () => Toast('取消');

//已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);
const tagList = [
  {
    text: '性别',
    children: [
      { text: '男', id: '男' },
      { text: '女', id: '女' },
    ],
  },
  {
    text: '年级',
    children: [
      { text: '大一', id: '大一' },
      { text: '大二', id: '大二' },
    ],
  },
];

</script>

<style scoped>

</style>
```



看看现在页面是什么样的  
![8a1807a5-4861-46d0-8925-62c36ca4fd88](./assets/02前后端整合联调&Swagger文档/8a1807a5-4861-46d0-8925-62c36ca4fd88.png)



但是点击×删不掉已选标签，这是因为我们没写移除标签函数，添加函数！



```javascript
//移除标签
const doClose = (tag) =>{
  activeIds.value=activeIds.value.filter(item =>{
    return item !== tag;
  })
}
```



别忘了在tag里面添加@close="doClose(tag)"！  
![1668341802953-93efb609-7a7b-4e4f-88a5-1db9711ebd06.png](./assets/02前后端整合联调&Swagger文档/1668341802953-93efb609-7a7b-4e4f-88a5-1db9711ebd06-085351-1729217866893-75.png)



不出意外的话就可以删除已选标签了



最后就要进行关键字查询，来去过滤标签了（可以直接在前端里面过滤，因为标签的数据量不大，没必要向后台发送请求）



![1668342486862-9205e53a-a7d3-4387-b983-b9ae05659a04.png](./assets/02前后端整合联调&Swagger文档/1668342486862-9205e53a-a7d3-4387-b983-b9ae05659a04-513102-1729217866893-77.png)



![1668342154330-8bbf139f-5bca-43cf-a06c-307d1274a9da.png](./assets/02前后端整合联调&Swagger文档/1668342154330-8bbf139f-5bca-43cf-a06c-307d1274a9da-478139-1729217866893-76.png)



> 现在要将数据扁平化，原来是嵌套结构，将数据扁平之后（打平）再进行过滤



![1668345481452-8cda1b34-9d62-42c2-8f9d-ec839309e9cf.png](./assets/02前后端整合联调&Swagger文档/1668345481452-8cda1b34-9d62-42c2-8f9d-ec839309e9cf-032060-1729217866893-78.png)



![1668345552291-c31ac01a-0f5d-421c-a851-10b959614f55.png](./assets/02前后端整合联调&Swagger文档/1668345552291-c31ac01a-0f5d-421c-a851-10b959614f55-169097-1729217866893-79.png)



> 踩坑注意：画红线框处我这边是必须要这样写，@炎大佬的笔记里两个都是花括号，照着写我这边就会显示Uncaught TypeError: tempChildren.filter is not a function
>
> 
>
> 测试：选中性别，搜索男，点击取消，选中年级，搜索大一



显示结果如下  
![1668344738069-3f2c6ba4-11e5-4b9e-aa28-4cc0766fb82c.png](./assets/02前后端整合联调&Swagger文档/1668344738069-3f2c6ba4-11e5-4b9e-aa28-4cc0766fb82c-439206-1729217866893-80.png)![1668345901304-96f73a64-7dd1-419c-aae5-fd584ba144ab.png](./assets/02前后端整合联调&Swagger文档/1668345901304-96f73a64-7dd1-419c-aae5-fd584ba144ab-875487-1729217866893-81.png)![1668344757916-1d6dafd1-230a-4353-9ad9-ffcab1e30411.png](./assets/02前后端整合联调&Swagger文档/1668344757916-1d6dafd1-230a-4353-9ad9-ffcab1e30411-112336-1729217866893-82.png)



#### 4.创建用户信息页


在vant文档里寻找到适合的组件来编写用户信息页面，这里选择了cell单元格，将其黏贴到UserPage.vue中  
![1668350612233-8cd503d5-f626-48ee-93f0-446b070f4c9b.png](./assets/02前后端整合联调&Swagger文档/1668350612233-8cd503d5-f626-48ee-93f0-446b070f4c9b-400148-1729217866893-83.png)



> 我们现在要定义一下后台用户数据的类别，在用户中心中我们曾经写过这个规范



在src目录下建立models目录，并创建user.d.ts文件，将规范粘贴进去并适当修改如下



```javascript
/**
 * 用户类别
 */
export type CurrentUser = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    gender: number;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    planetCode: string;
    tags: string[];
    createTime: Date;
};
```



在UserPage.vue中引入，自己写点假数据



```vue
<template>
  <van-cell title="昵称" is-link to='/user/edit' :value="user.username"/>
  <van-cell title="账号" is-link to='/user/edit' :value="user.userAccount" />
  <van-cell title="头像" is-link to='/user/edit'>
    <img style="height: 48px" :src="user.avatarUrl"/>
  </van-cell>
  <van-cell title="性别" is-link to='/user/edit' :value="user.gender" />
  <van-cell title="电话" is-link to='/user/edit' :value="user.phone" />
  <van-cell title="邮箱" is-link to='/user/edit' :value="user.email" />
  <van-cell title="星球编号" :value="user.planetCode" />
  <van-cell title="注册时间" :value="user.createTime.toISOString()" />
</template>

<script setup>
const user = {
  id: 1,
  username: '鱼皮',
  userAccount: 'dogYupi',
  avatarUrl: 'https://profile.csdnimg.cn/2/B/1/1_qq_56098191',
  gender: '男',
  phone: '12131133313',
  email: '23432444@qq.com',
  planetCode: '2220',
  createTime: new Date(),
};
</script>

<style scoped>

</style>
```



显示如下  


![7dd35a05-7853-44dc-86b0-df318d536110](./assets/02前后端整合联调&Swagger文档/7dd35a05-7853-44dc-86b0-df318d536110.png)

#### 5.创建用户信息修改页


点击>可进入到修改页  
![1668351082836-43b0f992-0651-4a3f-8e65-25c37a1cb866.png](./assets/02前后端整合联调&Swagger文档/1668351082836-43b0f992-0651-4a3f-8e65-25c37a1cb866-257939-1729217866893-84.png)



新建一个用户编辑页,命名为UserEditPage.vue



在route.ts添加新路由  
![1668352966882-9b19225f-8c65-4ecb-affd-4ecdeafd8e58.png](./assets/02前后端整合联调&Swagger文档/1668352966882-9b19225f-8c65-4ecb-affd-4ecdeafd8e58-744058-1729217866893-85.png)



对UserPage.vue和UserEditPage.vue进行修改  
UserPage.vue：  
![1668356722314-fc679e4e-30cc-4730-a646-71d959951bc1.png](./assets/02前后端整合联调&Swagger文档/1668356722314-fc679e4e-30cc-4730-a646-71d959951bc1-823755-1729217866893-86.png)



![1668356683857-3b4ee9f3-42ef-4040-8492-2a50a99c65ee.png](./assets/02前后端整合联调&Swagger文档/1668356683857-3b4ee9f3-42ef-4040-8492-2a50a99c65ee-674258-1729217866893-87.png)



UserEditPage.vue：



![1668356778240-9a2f63a2-c796-4a93-915c-0da9504e768e.png](./assets/02前后端整合联调&Swagger文档/1668356778240-9a2f63a2-c796-4a93-915c-0da9504e768e-380232-1729217866893-88.png)



现在可以开始写编辑方法了，从组件库获取相应的表单  
![1668357062976-f7d59df0-1984-4aea-ae8b-3033c3db971e.png](./assets/02前后端整合联调&Swagger文档/1668357062976-f7d59df0-1984-4aea-ae8b-3033c3db971e-932280-1729217866893-89.png)



复制粘贴到UserEditPage.vue修改整理如下



```vue
<template>
  <van-form @submit="onSubmit">
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="'请输入${editUser.editName}'"
      />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref} from "vue";
const route = useRoute();
const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})
const onSubmit = (values) => {
  //todo 把editKey currentValue editName提交到后台
  console.log('onSubmit',values);
}

</script>
```



同时别忘了这里多传了一个参数，在UserPage.vue里进行修改  
![1668385194186-60b05c8d-e3ab-4c9b-bc91-a429345795b7.png](./assets/02前后端整合联调&Swagger文档/1668385194186-60b05c8d-e3ab-4c9b-bc91-a429345795b7-871825-1729217866893-90.png)![1668385216976-3a192355-1cab-41c1-a9ac-e978d0509759.png](./assets/02前后端整合联调&Swagger文档/1668385216976-3a192355-1cab-41c1-a9ac-e978d0509759-944483-1729217866894-91.png)



修改以前不完善的地方，按左边返回按钮会重定向到首页，我们目标是回到上一页 ，修改这个地方  
![1668385375025-c6d4b7b3-2f1d-4970-80d2-11f174fe6df6.png](./assets/02前后端整合联调&Swagger文档/1668385375025-c6d4b7b3-2f1d-4970-80d2-11f174fe6df6-011333-1729217866894-92.png)



测试如下，修改页获得，点击提交，数据也获得，返回也正常



![7470631a-2a8b-4148-9bce-2640d34fa6bf](./assets/02前后端整合联调&Swagger文档/7470631a-2a8b-4148-9bce-2640d34fa6bf.png)



![1668384998050-92a3c81f-1ec6-4f8b-9ae8-7f35c1729aa7.png](./assets/02前后端整合联调&Swagger文档/1668384998050-92a3c81f-1ec6-4f8b-9ae8-7f35c1729aa7-984417-1729217866894-93.png)



## 第二期完结🎉🎉


> 更新: 2023-02-10 10:00:53  
> 原文: <https://www.yuque.com/shierkcs/catstudy/tswr4kn0r9mo8glt>