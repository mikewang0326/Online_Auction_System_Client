<template>
  <div>
      <h1>Users Page</h1>
      <div v-if="errorFlag" style="color:red;">
        {{ error }}
      </div>

     <div v-if="$route.params.userId">
       <div id="user">
         <router-link to="{ name:'users' }">Back to Users</router-link>
         <br/>
         <br/>

         <table>
           <tr>
             <td>User ID</td>
             <td>Username</td>
           </tr>

           <tr>
             <td>{{ $route.params.userId }}</td>
             <td>{{ getSingleUser($route.params.userId).username }}</td>
           </tr>
         </table>

         <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#deleteUserModal">
           Delete
         </button>

       </div>

       <div class = "modal fade" id = "deleteUserModal" tabindex = "-1" role = "dialog"
            aria-labelledby = "deleteUserModalLabel" aria-hidden = "true">
         <div class = "modal-dialog" role = "document">
           <div class = "modal-content">
             <div class = "modal-header">
               <h5 class = "modal-title" id = "deleteUserModalLabel" > Delete User </h5>
               <button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close">
                 <span aria-hidden = "true" > &times; </span>
               </button>


             </div>
             <div class = "modal-body">
               Are you sure that you want to delete this user?
             </div>

             <div class = "modal-footer">
               <button type = "button" class = "btn btn-primary" data-dismiss = "modal"
                       v-on:click="deleteUser($route.params.userId)">
                 Delete
               </button>
               <button type = "button" class = "btn btn-secondary" data-dismiss = "modal">
                 Close
               </button>

             </div>
           </div>
         </div>
       </div>


     </div>

      <div id="users">
              <table>
                  <tr v-for="user in users">
                    <td>{{ user.username }}</td>
                    <td><router-link :to="{ name :'user', params:{ userId: user.user_id }}"> View </router-link></td>
                  </tr>
              </table>
      </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        error:"",
        errorFlag: false,
        users:[]
      }
    },

    mounted: function () {
      this.getUsers()
    },

    methods: {
      getUsers: function () {
        this.$http.get("http://localhost:4941/api/v1/users")
          .then(function (response) {
            console.log("get response")
            this.users = response.data;
          }, function (error) {
             this.error = error;
             this.errorFlag = true;
          })
      },

      getSingleUser: function(id) {
        for (var i=0; i<=this.users.length; i++) {
          if (this.users[i].user_id == id) {
            return this.users[i];
          }
        }
      },

      addUser: function () {
        if (this.username === "") {
          alert("Please enter an username !")
        } else {
          alert("Valid username!")
          this.$http.post('http://localhost:4941/api/v1/users', {
            "username": this.username,
            "givenName": "xin12345",
            "familyName": "wang12345",
            "email": "hixin12345@example.com",
            "password": "12332112345"
          });
        }
      },

      deleteUser: function (user_id) {
        alert(user_id);
        this.$http.delete('http://localhost:4941/api/v1/users/' + user_id)
          .then(function (response) {
            alert("finished");
            let tmpid = user_id;
            for (let i = 0; i <= this.users.length; i++) {
              if (tmpid == this.users[i].user_id) {
                this.users.splice(i, 1);
              }
            }
            this.$router.push('/users') // 回到该页面
          }, function (error) {
            console.log(error)
            this.error = error;
            this.errorFlag = true;
          })
      },

      editUser: function (user) {
        alert('edit user user.id = ' + user.user_id)
        this.$http.patch('http://localhost:4941/api/v1/users/' + user.user_id, {
            // "givenName": "xin1234",
            // "familyName": "wang1234",
            // "password": "123321"
          },
          {
            headers: {
              "X-Authorization": 'a5771bce93e200c36f7cd9dfd0e5deaa',
              "Content-Type":'application/json',
            }
          })
          .then(function (response) {
            alert("finished edit");
          }, function (error) {
            console.log(error);
          })
      },

      editUser1: function (user) {
        alert('edit user user.id = ' + user.user_id)
        this.$http.patch('http://localhost:4941/api/v1/users/' + user.user_id)
          .then(function (response) {
            alert("finished edit");
          }, function (error) {
            console.log(error);
          })
      },

    }

  }
</script>
