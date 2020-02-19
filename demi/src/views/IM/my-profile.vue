<template>
  <div class="my-profile-wrapper">
    <avatars
            slot="reference"
            :src="currentUserProfile.avatar"
            class="my-avatar"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProfileCard from './profile-card'
export default {
  name: 'MyProfile',
  components: {
    ProfileCard,
  },
  data() {
    return {
      form: { avatar: '', nick: '', gender: '' }
    }
  },
  computed: {
    ...mapState({
      currentUserProfile: state => state.user.currentUserProfile,
    }),
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
.my-profile-wrapper
  width 50px
  height 50px
  margin 15px
  &>span
    display: block;
    width: 100%;
    height: 100%;
.my-avatar
  cursor pointer
  border-radius: 50%;
</style>
