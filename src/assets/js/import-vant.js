import Vue from 'vue';
import {
  List,
  PullRefresh,
  Search,
  Radio,
  Switch,
  CheckboxGroup,
  Checkbox,
  ActionSheet,
  Calendar,
  DatetimePicker,
  Picker,
  RadioGroup,
  Button,
} from 'vant';

const CompMap = {
  List,
  PullRefresh,
  Search,
  Radio,
  Switch,
  CheckboxGroup,
  Checkbox,
  ActionSheet,
  Calendar,
  DatetimePicker,
  Picker,
  RadioGroup,
  Button,
};

export function use(componentArr) {
  componentArr.forEach((comp) => {
    Vue.use(CompMap[comp]);
  });
}
