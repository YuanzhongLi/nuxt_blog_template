/* eslint-disable */

import Vue from 'vue';

import {
  Row,
  Col,
  Card,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Loading,
  Notification,
  Message,
  MessageBox,
  Button,
  Input,
  Icon,
  Table,
  TableColumn,
  Collapse,
  CollapseItem,
  Tabs,
  TabPane,
  Popover,
} from 'element-ui';

import lang from 'element-ui/lib/locale/lang/ja';
import locale from 'element-ui/lib/locale';

export default () => {
  locale.use(lang);

  Vue.use(Loading.directive);
  Vue.prototype.$loading = Loading.service;
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
  Vue.prototype.$notify = Notification;
  Vue.prototype.$message = Message;

  Vue.component(Row.name, Row);
  Vue.component(Col.name, Col);
  Vue.component(Card.name, Card);
  Vue.component(Button.name, Button);
  Vue.component(Input.name, Input);
  Vue.component(MessageBox.name, MessageBox);
  Vue.component(Dropdown.name, Dropdown);
  Vue.component(DropdownMenu.name, DropdownMenu);
  Vue.component(DropdownItem.name, DropdownItem);
  Vue.component(Icon.name, Icon);
  Vue.component(Dialog.name, Dialog);
  Vue.component(Table.name, Table);
  Vue.component(TableColumn.name, TableColumn);
  Vue.component(Collapse.name, Collapse);
  Vue.component(CollapseItem.name, CollapseItem);
  Vue.component(Tabs.name, Tabs);
  Vue.component(TabPane.name, TabPane);
  Vue.component(Popover.name, Popover);
};
