import {ADD_NOTES,DELETE_NOTES,GET_NOTES,EDIT_NOTES} from './storeTypes'

import UserData from '../commonJs/storageMethods'

export default {
    state:{
        msgName:'huhua001',
        noteDatas:[
          {title:'huahua我的记事本-1',description:'今天是周一，晚上下班有雨'}
        ],
        keyName:'noteNews'
    },
    mutations:{

      //添加记录
      [ADD_NOTES](state,data){
        //this.noteData.unshift(data)
        state.noteDatas.unshift(data)

        //设置唯一的ID
        let d = new Date()
        let id = d.getTime()

        //保存到缓存中
        UserData.save(state.noteDatas,state.keyName)
        console.log('add*****', UserData.get(state.keyName))
      },

      //删除记录
      [DELETE_NOTES](state,index){
        //this.noteData.splice(index,1)
        state.noteDatas.splice(index,1)
        UserData.save(state.noteDatas,state.keyName)
      },

      //修改记录
      [EDIT_NOTES](state,index){
        console.log('---out--index---:',index)
        let itemIndex = index
        let arr = []
        arr = state.noteDatas.forEach((item,index,arr)=>{
           if(index === itemIndex){
             console.log('note index---:',index)
             return item
           }
        })
        console.log('arr1---',arr)
        return arr
      }


    },

    actions:{},

    getters:{
       //从缓存中取出数据
       [GET_NOTES](state){
         let data = UserData.get(state.keyName)
         if(data){
           state.noteDatas = data
         }
         return state.noteDatas
       },

      GetMSG(state){
         return state.msgName
      }

    }
}
