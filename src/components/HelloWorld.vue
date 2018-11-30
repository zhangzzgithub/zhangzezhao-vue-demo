<template>
  <div class="hello">
    <table border="1" style="width:600px">
      <tr>
        <th>姓名</th>
        <th>性别</th>
        <th>年龄</th>
        <th>操作</th>
      </tr>
      <tr v-for="user in tableData">
        <td>{{ user.name }}</td>
        <td>{{ user.sex }}</td>
        <td><input type="number" v-model.number="user.age"></td>
        <td>
          <button @click="add(user,1)">增加</button>
        </td>
      </tr>
      <tr>
        <td>合计</td>
        <td></td>
        <td>{{total}}</td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  computed: {
    total: {
      get () {
        return this.tableData.reduce((sum, item) => {
          return sum + item.age
        }, 0)
      }
    }
  },
  mounted () {

  },
  watch: {
    //      total(nval,oval){
    //        alert("总数变化:"+ `变化前${oval}, 变化后${nval}`)
    //      }
  },
  props: {
    name: {}
  },
  data () {
    return {
      tableData: [
        {name: '王斌', sex: '1', age: 10},
        {name: '王斌2', sex: '1', age: 20},
        {name: '王斌3', sex: '1', age: 30},
        {name: '王斌3', sex: '1', age: 40}
      ],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    add (user, step) {
      user.age += step
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
