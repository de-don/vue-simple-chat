<template>
  <aside class="menu">
    <p class="menu-label">Rooms</p>

    <ul class="menu-list">
      <li v-for="room in rooms" :key="room.slug">
        <router-link :to="'/chat/'+room.slug" :class="{ 'is-active': selectedChatRoomSlug === room.slug }">
          {{ room.name }}
        </router-link>
      </li>
    </ul>

    <hr>
    <p v-if="!addingRoom">
      <a class="button is-primary" @click="addingRoom = true">
        <fa-icon icon="plus"/> Create new channel
      </a>
    </p>
    <form @submit.prevent="addRoom" v-if="addingRoom">
      <div class="field has-addons">
        <input type="text" v-model="newRoomName" placeholder="New room" class="input">
        <p class="control">
          <button class="button is-success" type="submit"><fa-icon icon="plus"/> Add</button>
        </p>
      </div>
    </form>
  </aside>
</template>

<script>
import {FirebaseDb} from '../library/Database';

export default {
  name: 'ChatRooms',
  props: {
    selectedChatRoomSlug: {
      type: String,
      required: true,
      default: 'general',
    }
  },
  data() {
    return {
      rooms: [{
        name: 'General',
        slug: 'general',
        owner: null,
      }],
      addingRoom: false,
      newRoomName: '',
    }
  },
  computed: {
    uid () {
      return this.$store.state.uid;
    }
  },
  watch: {
    selectedChatRoomSlug (slug, oldSlug) {
      this.$emit(
        'setActiveRoom',
        this.rooms.find(room => room.slug === slug),
        this.rooms.find(room => room.slug === oldSlug),
      );
    },
  },
  methods: {
    addRoom() {
      if (this.newRoomName === '') {
        return;
      }

      const newRoom = {
        name: this.newRoomName,
        slug: this.slugify(this.newRoomName),
        owner: this.uid,
      };

      FirebaseDb.ref('rooms/' + newRoom.slug).set(newRoom);
    },


    slugify(name) {
      return name.toString().toLowerCase().trim()
        .replace(/\s+/g, '-')
        .replace(/&/g, '-and-')
        .replace(/[^\w-]/g, '')
        .replace(/--+/g, '-')
    }
  },
  created () {
    FirebaseDb.ref('rooms').on('child_added', (data) => {
        this.rooms.push(data.val());

        if (this.selectedChatRoomSlug === data.val().slug) {
          this.$emit(
            'setActiveRoom',
            this.rooms.find(room => room.slug === data.val().slug)
          );
        }
      });


    FirebaseDb.ref('rooms').on('child_removed', (data) => {
      this.rooms.splice(this.rooms.findIndex(room => room.slug === data.val().slug), 1);
    });

    if (this.selectedChatRoomSlug === 'general') {
      this.$emit(
        'setActiveRoom',
        this.rooms.find(room => room.slug === this.selectedChatRoomSlug)
      );
    }
  }
};
</script>

<style scoped>

</style>
