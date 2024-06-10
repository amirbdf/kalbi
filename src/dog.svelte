<script lang="ts">
    import { auth, db, storage } from './firebase';
    import { onAuthStateChanged, type User } from "firebase/auth";
    import { collection, addDoc } from "firebase/firestore";
    import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
    import { writable } from 'svelte/store';
  
    let user: User | null = null;
    let dogName: string = '';
    let dogBreed: string = '';
    let dogAge: string = '';
    let dogImage: File | null = null;
    let message = writable<string>('');
  
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        user = currentUser;
      } else {
        user = null;
      }
    });
  
    async function postDog() {
      if (user) {
        try {
          let imageUrl = '';
  
          if (dogImage) {
            const storageRef = ref(storage, `dogImages/${dogImage.name}`);
            const snapshot = await uploadBytes(storageRef, dogImage);
            imageUrl = await getDownloadURL(snapshot.ref);
          }
  
          await addDoc(collection(db, "dogs"), {
            name: dogName,
            breed: dogBreed,
            age: dogAge,
            imageUrl: imageUrl,
            userId: user.uid,
            createdAt: new Date()
          });
  
          message.set('Dog posted successfully!');
          dogName = '';
          dogBreed = '';
          dogAge = '';
          dogImage = null;
          (document.getElementById('dogImage') as HTMLInputElement).value = ''; // Clear the file input
        } catch (error) {
          console.error('Error posting dog:', error);
          message.set('Failed to post dog.');
        }
      } else {
        message.set('You must be logged in to post a dog.');
      }
    }
  
    function handleFileChange(event: Event) {
      const input = event.target as HTMLInputElement;
      dogImage = input.files?.[0] ?? null;
    }
  </script>
  
  {#if user}
    <div>
      <h2>Post a Dog</h2>
      <input type="text" bind:value={dogName} placeholder="Dog Name" />
      <input type="text" bind:value={dogBreed} placeholder="Dog Breed" />
      <input type="number" bind:value={dogAge} placeholder="Dog Age" />
      <input type="file" id="dogImage" on:change={handleFileChange} />
      <button on:click={postDog}>Post Dog</button>
      <p>{$message}</p>
    </div>
  {:else}
    <p>Please log in to post a dog.</p>
  {/if}
  
  <style>
    input {
      display: block;
      margin: 0.5rem 0;
      padding: 0.5rem;
    }
    button {
      padding: 0.5rem 1rem;
    }
  </style>
  