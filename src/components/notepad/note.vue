<template>
      <div id="myNode" ref="picNode">

       <!--顶部导航 -->
      <yd-navbar title="navber" fixed  bgcolor="#fff" fontSize="18px" class="navBar">
        <router-link slot="left" :to="{path:pathName}" v-show="isShowReturn">
         <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
        <div slot="center">{{topTit}}</div>
        <div slot="right" @click="takePic1" style="margin-right:15px">
        截图
        </div>
        <div slot="right" @click="deletePic">
        删除
        </div>
      <!--<div slot="right" @click.stop="addNewBank()">-->
      <!--新建-->
      <!--</div>-->
      </yd-navbar>


      <div class="noteWrap">
        <!--新建历史列表-->
        <div class="addNewNoteWrap">
          <form>
            <div class="com-input-container">
              <label>标题:</label>
              <textarea v-inputActive
                        maxlength="200"
                        class="md-input"
                        v-model="newNoteData.title"
                        ></textarea>
            </div>

            <div class="com-input-container">
              <label>描述:</label>
              <textarea v-inputActive
                        class="md-input"
                        maxlength="100"
                        style="height:60px"
                        v-model="newNoteData.noteDescription"
              ></textarea>
            </div>
            <div class="btn-group-inline">
               <z-button size="large" type="danger" @click.native="saveNewNote()">保存</z-button>
               <z-button size="large" type="hollow" @click.native="clearForm()">重置</z-button>
            </div>
          </form>
        </div>

        <!--历史记事本列表-->
         <div class="historyList">
             <ul>
                 <li v-for="(note,index) in noteDatas">
                   <dl>
                     <dt>{{note.title}}</dt>
                     <dd>{{note.description}}</dd>
                   </dl>
                   <span @click="deleteNote(index)">删除</span>
                   <span v-on:click="editNote(index)">修改</span>
                 </li>
             </ul>
         </div>


        <!--<div>now </div>-->
        <!--<hr/>-->
        <!--<div style="padding:5px;">-->
          <!--<yd-button size="small" type="primary" @click.native="getNowtime()">t1</yd-button>-->
          <!--<yd-button size="small" type="primary">t2</yd-button>-->
          <!--<yd-button size="small" type="primary">t3</yd-button>-->
        <!--</div>-->

        <div class="btn-group-inline">
             <z-button size="large" v-on:click.native="testJs">test</z-button>
        </div>

        <div>msg:{{GetMSG}}</div>

      </div>
    </div>
</template>

<script>
//截图工具
import domtoimage from 'dom-to-image'
//store
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'

//引入自定义组件按钮
import zButton from '../../globalComponents/button'



export default {
    name:'Note',
    data(){
        return{
          isShowReturn:true,
          pathName:'/',
          topTit:'我的记事本',
          newNoteData:{
            title:'',
            noteDescription:''
          },
          myTitle:'',
          noteInfo:"",
          timeFlag:'',

          messgae:'shelley',


          arrObj:[
            {name: "shelley", age: 14},
            {name: "timo", age: 15},
            {name: "lily", age: 16},
            {name: "lucy", age: 16}
          ],
          obj1:{
            name:'shelley',
            tel:1234567890,
            age:34
          },
        }
    },
     components:{
       zButton
     },


  //过滤器
  filters:{
    capitalize:function(value){
      return value+'001'
    }
  },

    mounted(){
      console.log('------msg----start-')
      console.log(this.GetMSG)
      console.log('------msg----end-')
    },
    created(){

    },

    watch:{

    },
    computed:{
      ...mapGetters(['GET_NOTES','GetMSG']),
      noteDatas(){
        return this.GET_NOTES
      },

      // ...mapState({
      //   msg:(state)=>state.msgName
      // })
    },
    methods:{
      //测试js
      testJs(){

        var a = [1,2,3,4,5];
        console.log(a.splice(1,3)); //[2, 3, 4]
        console.log(a)

      },
      //调用store中的方法
      ...mapMutations(['ADD_NOTES','DELETE_NOTES','EDIT_NOTES']),

      //添加新记事到列表中
      saveNewNote(){
        let data = {}
        // if(!this.newNoteData.title || !this.newNoteData.noteDescription){
        //   return
        // }
        if(!this.newNoteData.title){
          alert('标题不能为空')
          return
        }
        if(!this.newNoteData.noteDescription){
          alert('描述不能为空')
          return
        }
        data.title = this.newNoteData.title
        data.description = this.newNoteData.noteDescription
        //this.noteData.unshift(data)
        //调用store,暂存数据
        this.ADD_NOTES(data)
        this.clearForm()
      },
      //删除
      deleteNote(index){
        console.log('index----',index);
        //this.noteData.splice(index,1)
        this.DELETE_NOTES(index)
      },
      //修改记录
      editNote(itemIndex){
        let arr = []
        arr = this.EDIT_NOTES(itemIndex)
        console.log('arr2---',arr)
      },


      //清空表单
      clearForm(){
        this.newNoteData.title = ''
        this.newNoteData.noteDescription = ''

        let ele = document.querySelectorAll('.com-input-container')
        console.log(ele)

        ele.forEach((item,index,arr)=>{
          item.removeAttribute('class')
          item.setAttribute('class','com-input-container')
        })


        // ele.removeAttribute('class')
        // console.log(ele)
        // ele.setAttribute('class','com-input-container')
        // console.log(ele)
      },



      //截图 64位码编码
      takePic1(){
        console.log('-----tack img')
        let node1 = document.getElementById('myNode');
        let node2 = this.$refs.picNode;
        domtoimage.toPng(node1)
          .then(function(dataUrl){
            let img = new Image();
            img.src = dataUrl;
            let s = 'height:100px';
            let c = 'test'
            img.style = s;
            img.className = c;
           // img.setAttribute('class',test);
            document.body.appendChild(img);
            //img.setAttribute('id','imgTest')
            //document.body.lastElementChild.setAttribute('class','test')
          })
          .catch(function(error){
            console.error('error------')
          })
      },

      deletePic(){
        let doms = document.querySelectorAll('.test')
       // console.log(doms.length)
        doms.forEach((itme,i)=>{
          //console.log('-------------i----',i)
          //console.log(itme)
          document.body.removeChild(itme)
        })
      }

    }
    
}
</script>

