<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { login, getToken, getConfig, getHouseholdList } from '@/api/api';
export default {
  data() {
    return {
      getTokenStamp: null,
    };
  },
  async mounted() {
    await this.thirdLogin();
    await this.initToken();
    await this.initHouseholdInfo();
  },
  methods: {
    async thirdLogin() {
      const tk = location.href.split('tk=')[1] || sessionStorage.getItem('tk');
      sessionStorage.setItem('tk', tk);
      const res = await login({
        app_id: this.$store.appId,
        code: tk,
      });
      this.$store.userInfo = {
        ...res.data.body,
      };
    },
    async initToken() {
      const { appId, appKey, userInfo } = this.$store;
      const { user_id } = userInfo;
      const res = await getToken({
        app_id: appId,
        app_key: appKey,
        user_id,
      });
      const { body } = res.data;
      const { expires_in } = body;
      this.$store.appInfo = {
        ...body,
      };
      if (!this.getTokenStamp) {
        this.setTokenInterval(expires_in);
      }
      this.initConfig();
    },
    async initConfig() {
      const res = await getConfig();
      const { list } = res.data.body;
      const {
        人群类型: identity,
        文化程度: education,
        职业: position,
        重点走访类型: pointType,
        问题分类: problem,
      } = list;
      this.$store.identityList = identity;
      this.$store.educationList = education;
      this.$store.positionList = position;
      this.$store.pointTypeList = pointType;
      this.$store.problemList.push(...problem);
    },
    async initHouseholdInfo() {
      const res = await getHouseholdList();
      const { user, list } = res.data.body;
      this.$store.userInfo = {
        ...user,
      };
      this.$store.householdList = list;
      list.forEach((item) => {
        this.$store.noList.push({
          name: item.household_name,
          code: item.household_id,
        });
      });
    },
    setTokenInterval(expires) {
      this.getTokenStamp = setInterval(() => {
        this.initToken();
      }, expires * 1000);
    },
  },
};
</script>

<style lang="less">
@import './app.less';

body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
