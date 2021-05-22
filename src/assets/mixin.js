import { store } from './store';
export const mixin = {
  methods: {
    px2vw(px) {
      return (px / 750) * 100 + 'vw';
    },
    problem(v) {
      return store.problemList.filter((item) => {
        return item.code === v;
      })[0]?.name;
    },
    process(v) {
      return store.processList.filter((item) => {
        return item.code === v;
      })[0]?.name;
    },
    shipment(v) {
      return store.shipmentList.filter((item) => {
        return item.code === v;
      })[0]?.name;
    },
    gender(v) {
      return store.genderList.filter((item) => {
        return item.code === v;
      })[0]?.name;
    },
    education(v) {
      return store.educationList.filter((item) => {
        return item.code === v;
      })[0]?.name;
    },
    identity(v) {
      return store.identityList.filter((item) => {
        return item.code === v;
      })[0]?.name;
    },
    position(v) {
      return store.positionList.filter((item) => {
        return item.code === v;
      })[0]?.name;
    },
  },
};
