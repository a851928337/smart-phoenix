<template>
  <div class="index-page">
    <div class="banner">
      <div class="left">
        <img src="~@/assets/image/avatar.png" class="avatar" />
        <div class="info-part">
          <div class="name">{{ $store.userInfo.user_name }}</div>
          <div class="info">
            {{ $store.userInfo.department_name || '暂无数据' }}
            {{ $store.userInfo.household_num }}户
          </div>
        </div>
      </div>
      <router-link class="right" to="/record" tag="div"
        >走访记录 <i class="iconfont icon-you"
      /></router-link>
    </div>
    <div class="list">
      <router-link
        tag="div"
        v-for="item in $store.householdList"
        :key="item.id"
        class="item tap-transform"
        :to="{ path: `/record/submit/${item.household_id}` }"
      >
        <div class="row1">
          <div class="no">{{ item.household_name }}</div>
          <div class="people">
            <img src="~@/assets/image/people.png" />
            {{ item.num }}人
          </div>
        </div>
        <div class="row2">
          <div class="info">
            <div class="name">{{ item.resident_name }}</div>
            <div class="phone">
              <img src="~@/assets/image/phone.png" />{{ item.contact_no }}
            </div>
            <div class="address">{{ item.resident_address }}</div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'index-page',
  data() {
    return {
      refresh: false,
      loading: false,
      finished: false,
      list: [],
    };
  },
  methods: {
    onNavigatorTo(e) {
      const { id } = e.target;
      if (id !== undefined) {
        this.$route.push({});
      }
    },
  },
};
</script>

<style lang="less" scoped>
.index-page {
  display: flex;
  flex-flow: column;
  height: 100vh;
  & > * {
    width: 100%;
  }
  .banner {
    display: inline-flex;
    height: .px2vw(220) [ @vw];
    background-image: url('~@/assets/image/banner.png');
    background-size: contain;
    padding: 0 .px2vw(38) [ @vw] 0 .px2vw(81) [ @vw];
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: .px2vw(81) [ @vw];
        height: .px2vw(81) [ @vw];
        object-fit: contain;
      }
      .info-part {
        margin-left: .px2vw(35) [ @vw];
        .name {
          font-size: .px2vw(38) [ @vw];
          font-weight: bold;
        }
        .info {
          font-size: .px2vw(28) [ @vw];
        }
      }
    }
    .right,
    .right i {
      font-size: .px2vw(24) [ @vw];
    }
  }
  .list {
    overflow-y: auto;
    flex: 1;
    background-color: #f5f5f5;
    .item {
      padding-left: .px2vw(30) [ @vw];
      background-color: #fff;
      &:not(:last-child) {
        margin-bottom: .px2vw(20) [ @vw];
      }
      .row1,
      .row2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .px2vw(30) [ @vw] 0 .px2vw(52) [ @vw];
      }
      .row1 {
        border-bottom: 1px solid #e8e8e8;
        height: .px2vw(80) [ @vw];
        * {
          line-height: 1;
        }
        .no {
          border-left: .px2vw(10) [ @vw] solid @green;
          padding-left: .px2vw(11) [ @vw];
          font-size: .px2vw(32) [ @vw];
          font-weight: bold;
        }
        .people {
          display: flex;
          align-items: center;
          font-size: .px2vw(28) [ @vw];
          img {
            width: .px2vw(20) [ @vw];
            height: .px2vw(24) [ @vw];
            object-fit: contain;
            margin-right: .px2vw(8) [ @vw];
          }
        }
      }
      .row2 {
        padding-top: .px2vw(28) [ @vw];
        padding-bottom: .px2vw(41) [ @vw];
        .info {
          & > div:not(:last-child) {
            margin-bottom: .px2vw(13) [ @vw];
          }
          .name {
            color: #333;
            font-size: .px2vw(34) [ @vw];
            font-weight: bold;
          }
          .phone,
          .address {
            color: #666;
          }
          .phone {
            display: flex;
            align-items: center;
            font-size: .px2vw(28) [ @vw];
            img {
              width: .px2vw(24) [ @vw];
              height: .px2vw(24) [ @vw];
              margin-right: .px2vw(6) [ @vw];
            }
          }
          .address {
            font-size: .px2vw(24) [ @vw];
          }
        }
        .icon-you {
          font-size: .px2vw(24) [ @vw];
          color: #999;
        }
      }
    }
  }
}
</style>
