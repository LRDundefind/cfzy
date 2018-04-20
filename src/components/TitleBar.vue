<template>
    <div class="titleBar ub f-s-14 c-3">

        <div class="appName">{{enterprise.compay_name}}</div>

        <div class="f-s-14 p-l-20">{{compayName}}</div>

        <div class="ub-f1">&nbsp;</div>
        <div class="userName click c-6 f-s-14">{{enterprise.role}}</div>
        <div v-if="this.userName != 'null'" class="c-6 f-s-14">&nbsp;-&nbsp;</div>
        <div v-if="this.userName != 'null'" class="click c-6 f-s-14">{{userName}}</div>
        <div v-if="this.userName != 'null'">
            <div v-show="system" class="m-l-30 dangwei click c-6">
                {{personalData.markName}}&nbsp;—&nbsp;{{personalData.gearName}}
            </div>
        </div>
        <div v-show="system">
            <el-dropdown @command="handleCommand" v-show="showSelect">
            <span class="el-dropdown-link m-l-30">
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
                <el-dropdown-menu slot="dropdown">

                    <el-dropdown-item :command="item" v-for="item in gear" :key="item.gid"
                                      :class="{enterprise : gid == item.gid}">{{item.gearName}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="c-e72c2c m-l-30 click" @click="goLogin">退出</div>
    </div>
</template>

<script>
    import _ from 'lodash';
    export default {
        name: 'titleBar',
        data() {
            return {
                userName: '',
                compayName: '',
                showSelect: true,//下拉icon的显示隐藏
                gid: '',//企业id
                gear: [],
                personalData: [],
                //登录成功后，返回的数据
                enterprise: {
                    compay_name: '程丰智运',
                    username: '',
                    role: '',
                    stalls_list: []
                },
            }
        },
        mounted() {
            this.gear = JSON.parse(window.localStorage.getItem('gid'));
            this.personalData = this.gear[0];
            this.compayName = window.localStorage.compayName;   //公司名字
            this.userName = window.localStorage.userName;   //用户名字

            if (window.localStorage.getItem('roleId') == 'role_owner') {
                this.enterprise.role = '档主'
            } else if (window.localStorage.getItem('roleId') == 'role_finance') {
                this.enterprise.role = '财务'
            } else {
            }

            this.showSelect = this.$route.meta.showSidebar == false ? false : true

            var _this = this
            this.storageChange();
            window.addEventListener("setItemEvent", function (e) {
                if (_this.$route.name == "enterpriseMessage") _this.compayName = e.newValue
                else if (_this.$route.name == "personalData") _this.userName = e.newValue
                //console.log("本地存储已变化，新值为" + e.newValue);
            });
        },

        computed: {
            system: function () {
                if (this.$route.path.indexOf("/system") == 0) {
                    return false
                } else {
                    return true
                }
            }
        },


        methods: {
            storageChange(){
                var oriSetItem = localStorage.setItem;
                localStorage.setItem = function (key, value) {
                    //这里抛出自定义事件
                    var event = new Event("setItemEvent");
                    event.newValue = value;
                    window.dispatchEvent(event);
                    //实现原方法
                    oriSetItem.apply(this, arguments);
                }
            },
            handleCommand(command) {

                //this.$message('click on item ' + command);
                //this.gid = command;
                var temp = command;
                var s = JSON.parse(window.localStorage.getItem('gid'))
                var index = null;
                for (var i = 0; i < s.length; i++) {
                    if (command.gid == s[i].gid) {
                        index = i
                    }
                }
                s.splice(index, 1);
                s.unshift(temp);
                let gid_list = JSON.stringify(s);

                window.localStorage.setItem('gid', gid_list);
                location.reload();

            },
            goLogin(){
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('randomKey');
                this.$router.push({name: 'Login'});
            }
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route' (to, from) {
                this.showSelect = this.$route.meta.showSidebar == false ? false : true
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .titleBar {
        width: 100%;
    }

    div {
        line-height: 60px;
    }

    .appName {
        width: 185px;
        line-height: 60px;
        background-color: #33d57c;
        text-align: center;
        color: #fff;
        font-size: 25px;
        font-weight: bold;
        letter-spacing: 10px;
    }

    .userName {
        background-image: url(../assets/titleBar/com_gerenzhongxin_icon.png);
        background-repeat: no-repeat;
        background-size: 24px 23px;
        background-position: left center;
        padding-left: 34px;
        font-size: 14px;
    }

    .enterprise {
        background-color: rgb(236, 245, 255);
        color: rgb(102, 177, 255);
    }
</style>