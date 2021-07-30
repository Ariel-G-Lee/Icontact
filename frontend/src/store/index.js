import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index.js'
import userApi from '@/api/user.js';
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
        createPersistedState(),
      ],
  state: {
    user: null,
    
    notebookcreate:0,
    notebookupdate:0,


    // 회원가입 공통화면 데이터
    sendUserId:'',
    sendPassword:'',
    sendUserName:'',
    sendPhoneNumber:'',
    
    // 비밀번호 변경 데이터 
    sendUserIdForChangePW: '',
   
    // 로그인 결과 데이터
    type: 0,
    accept: 0,


    isLoggedIn: null,
  },
  mutations: {

    // 반 검색
    SET_THEACHER_INFO: function (state, data) {
      state.sendUserId = data.userid,
      state.sendPassword = data.password,
      state.sendUserName = data.username,
      state.sendPhoneNumber = data.phoneNumber
    },
    SET_PARENT_INFO: function (state, data) {
      state.sendUserId = data.userid,
      state.sendPassword = data.password,
      state.sendUserName = data.username,
      state.sendPhoneNumber = data.phoneNumber 
    },
    SET_USER(state, payload) {
      state.user = payload;
      console.log(state.user)
      state.isLoggedIn = true
    },
    REMOVE_USER(state) {
      state.user = null;
      state.isLoggedIn = false
    },
    SET_SEND_USER_ID_FOR_CHANGE_PW: function (state, userid) {
      state.sendUserIdForChangePW = userid
      
    },
    
  },
  actions: {
    // 회원가입
    setTeacherInfo: function({commit}, data) {
      commit('SET_THEACHER_INFO', data)
      router.push({ name: 'SignupTeacher' })
    },
    setParentInfo: function({commit}, data) {
      commit('SET_PARENT_INFO', data)
      router.push({ name: 'SignupParent' })
    },

    setUser(context, payload) {
      context.commit('SET_USER', payload);
    },


    async removeUser(context) {
      try{
        await userApi.updateUser({
          userId : context.state.user.userId,
        },
        {
          "access-token": sessionStorage.getItem('access-token')
        });
      } catch (e) {
        console.log(e)
      }
      context.commit('REMOVE_USER');
      sessionStorage.clear();
    },

    // 비밀번호 변경 - id 값 저장
    setSendUserIdForChangePW: function ({commit}, userid) {
      console.log(userid)
      commit('SET_SEND_USER_ID_FOR_CHANGE_PW', userid)
      router.push({ name: 'ChangePassword' })
    },

    

  },
})
