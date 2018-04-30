<template>
  <div>
      <h1>Users Page</h1>
      <div v-if="errorFlag" style="color:red;">
        {{ error }}
      </div>

      <div id="users">
              <table>
                  <tr v-for="user in users">
                    <td>{{ user.username }}</td>
                    <td><!-- view link here --></td>
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

      deleteUser: function (user) {
        alert(user.user_id);
        this.$http.delete('http://localhost:4941/api/v1/users/' + user.user_id)
          .then(function (response) {
            alert("finished");
            let tmpid = user.user_id;
            for (let i = 0; i <= this.users.length; i++) {
              if (tmpid == this.users[i].user_id) {
                this.users.splice(i, 1);
              }
            }
          }, function (error) {
            console.log(error);
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
