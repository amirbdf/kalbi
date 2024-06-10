<script lang="ts">
    import { auth, db } from '../../firebase';
    import { onAuthStateChanged, type User } from "firebase/auth";
    import { collection, getDocs, query, where } from "firebase/firestore";
    import { writable } from 'svelte/store';
  
    let user: User | null = null;
    let breedSearch: string = '';
    let priceMin: string = '';
    let priceMax: string = '';
    let allDogs = writable<any[]>([]);
    let dogs = writable<any[]>([]);
    let message = writable<string>('');
  
    onAuthStateChanged(auth, (currentUser) => {
      user = currentUser;
      fetchAllDogs();
    });
  
    async function fetchAllDogs() {
      try {
        const querySnapshot = await getDocs(collection(db, "dogs"));
        const allDogsList = querySnapshot.docs.map(doc => doc.data());
        allDogs.set(allDogsList);
        dogs.set(allDogsList);
      } catch (error) {
        console.error('Error fetching dogs:', error);
        message.set('Failed to fetch dogs.');
      }
    }
  
    async function searchDogs() {
      try {
        let filteredDogs = [...$allDogs];
  
        if (breedSearch.trim()) {
          filteredDogs = filteredDogs.filter(dog => dog.breed.toLowerCase().includes(breedSearch.trim().toLowerCase()));
        }
  
        if (priceMin.trim()) {
          filteredDogs = filteredDogs.filter(dog => dog.price >= parseInt(priceMin));
        }
  
        if (priceMax.trim()) {
          filteredDogs = filteredDogs.filter(dog => dog.price <= parseInt(priceMax));
        }
  
        dogs.set(filteredDogs);
  
        if (filteredDogs.length === 0) {
          message.set('No dogs found matching the criteria.');
        } else {
          message.set('');
        }
      } catch (error) {
        console.error('Error searching dogs:', error);
        message.set('Failed to search dogs.');
      }
    }
  </script>
  
  <div>
    <h2>Search for Dogs</h2>
    <input type="text" bind:value={breedSearch} placeholder="Search by Breed" on:input={searchDogs} />
    <input type="number" bind:value={priceMin} placeholder="Min Price" on:input={searchDogs} />
    <input type="number" bind:value={priceMax} placeholder="Max Price" on:input={searchDogs} />
    <p>{$message}</p>
    
    {#if $dogs.length > 0}
      <ul>
        {#each $dogs as dog}
          <li>
            <h3>{dog.name} - {dog.breed}</h3>
            <p>Age: {dog.age}</p>
            <p>Price: {dog.price}</p>
            <p>Contact: {dog.contact}</p>
            {#if dog.imageUrl}
              <img src={dog.imageUrl} alt="{dog.name}" width="100" />
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
  
  <style>
    input {
      display: block;
      margin: 0.5rem 0;
      padding: 0.5rem;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      margin: 1rem 0;
    }
    img {
      display: block;
      margin: 0.5rem 0;
    }
  </style>
  