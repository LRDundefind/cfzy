<template>
    <div class="titleBar ub f-s-14 c-3">
        <router-link :to="{ name: 'home'}" v-if="types == 'role_owner'">
        <div class="appName">{{enterprise.compay_name}}</div>
        </router-link>
        <router-link :to="{ name: 'moneyHome'}" v-else>
        <div class="appName">{{enterprise.compay_name}}</div>
        </router-link>
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
            <span class="el-dropdown-link m-l-10">
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
                <el-dropdown-menu slot="dropdown">

                    <el-dropdown-item :command="item" v-for="item in gear" :key="item.gid"
                                      :class="{enterprise : gid == item.gid}">{{item.gearName}}
                                      <p>档主：{{item.ownerName}}</p>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="c-e72c2c m-l-30 click" @click="goLogin">退出</div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import { home } from '@/services/apis/home.api';
    import Cookies from 'js-cookie'
    import Bus from '@/util/bus.js'
    export default {
        name: 'titleBar',
        data() {
            return {
                types:Cookies.get('roleId'),  
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
        created(){
            //从系统设置的添加档位接收到消息，更新档位列表
            Bus.$on('setGear',data=>{
                this.gear = data;
                // home.gearList()
                // .then(response => {
                //     this.gear = response.data.results;
                // })
            })
        },
        mounted() {
            //this.gear = JSON.parse(Cookies.get('gid'));
            //获取档位列表
            home.gearList()
            .then(response => {
                this.gear = response.data.results;
            })
            this.personalData = JSON.parse(Cookies.get('gid'));

            this.compayName = Cookies.get('compayName');   //公司名字
            this.userName = Cookies.get('userName');   //用户名字
            if (Cookies.get('roleId') == 'role_owner') {
                this.enterprise.role = '档主'
            } else if (Cookies.get('roleId') == 'role_finance') {
                this.enterprise.role = '财务'
            } else if(Cookies.get('roleId') == 'role_finance_sell'){
                this.enterprise.role = '财务兼卖手'
            }

            this.showSelect = this.$route.meta.showSidebar == false ? false : true

            var _this = this
            this.storageChange();
            //监听localstorage是否发生改变，从而修改公司名字和用户名字
            window.addEventListener("setItemEvent", function (e) {
                if (_this.$route.name == "enterpriseMessage") _this.compayName = e.newValue
                else if (_this.$route.name == "personalData") _this.userName = e.newValue
                else if (_this.$route.name == "record") _this.gear = JSON.parse(e.newValue)
                //console.log("本地存储已变化，新值为" + e.newValue);
            });
        },

        computed: {
            //进入系统设置后，不能切换档位
            system: function () {
                if (this.$route.path.indexOf("/system") == 0 || (!this.gear)) {
                    return false
                } else {
                    return true
                }
            }
        },

        methods: {
            /**
             * 监听localstorage改变的方法
             * @return {[type]} [description]
             */
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
            /**
             * 切换档位
             * @param  {[type]} command [切换的档位的信息]
             * @return {[type]}         [description]
             */
            handleCommand(command) {
                //this.$message('click on item ' + command);
                //this.gid = command;
                var temp = JSON.stringify(command);
                // var s = JSON.parse(Cookies.get('gid'))
                // var index = null;
                // for (var i = 0; i < s.length; i++) {
                //     if (command.gid == s[i].gid) {
                //         index = i
                //     }
                // }
                // s.splice(index, 1);
                // s.unshift(temp);
                // let gid_list = JSON.stringify(s);
                Cookies.set('gid', temp);
                Cookies.set('roleId', command.roleId);
                Cookies.set('owner_id', command.ownerId);
                if (command.roleId == 'role_owner') {
                    this.$router.push({name:'home'}) 
                }else{
                    this.$router.push({name:'moneyHome'})
                }
                window.location.reload()
            },
            /**
             * 退出登录
             * @return {[type]} [description]
             */
            goLogin(){
                //清空cookie
                var keys = document.cookie.match(/[^ =;]+(?=\=)/g);  
                    if (keys) {
                        console.log(keys);
                        var q = keys;
                        q.forEach(function(value){
                            // document.cookie = value + '=0;expires=' + new Date(0).toUTCString()  
                            Cookies.remove(value);
                            console.log(value);
                        });
                }    
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

    .el-dropdown-menu{
        max-height: 400px;
        overflow-x: hidden;
        overflow-y: scroll;
        
    } 
    .el-dropdown-menu__item{
        border-bottom: 1px #f0f0f0 solid;
    }
</style>