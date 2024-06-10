<script lang="ts">
    import { auth, db, storage } from '../../firebase';
    import { onAuthStateChanged, type User } from "firebase/auth";
    import { collection, addDoc } from "firebase/firestore";
    import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
    import { writable } from 'svelte/store';

    let user: User | null = null;
    let dogName: string = '';
    let dogBreed: string = '';
    let dogAge: string = '';
    let dogPrice: string = '';
    let contact: string = '';
    let dogImage: File | null = null;
    let message = writable<string>('');
    let isButtonDisabled = writable<boolean>(true);

    onAuthStateChanged(auth, (currentUser) => {
        user = currentUser;
        validateForm();
    });

    function validateForm() {
        if (user && dogName.trim() && dogBreed.trim() && dogAge.trim() && dogPrice.trim() && contact.trim() && dogImage) {
            isButtonDisabled.set(false);
        } else {
            isButtonDisabled.set(true);
        }
    }

    async function postDog() {
        if (user && dogName.trim() && dogBreed.trim() && dogAge.trim() && dogPrice.trim() && contact.trim() && dogImage) {
            try {
                let imageUrl = '';

                if (dogImage) {
                    const storageRef = ref(storage, `dogImages/${Date.now()}_${dogImage.name}`);
                    const snapshot = await uploadBytes(storageRef, dogImage);
                    imageUrl = await getDownloadURL(snapshot.ref);
                }

                await addDoc(collection(db, "dogs"), {
                    name: dogName,
                    breed: dogBreed,
                    age: parseInt(dogAge.trim()),
                    price: parseInt(dogPrice.trim()),
                    contact: contact,
                    imageUrl: imageUrl,
                    userId: user.uid,
                    createdAt: new Date()
                });

                message.set('Dog posted successfully!');
                dogName = '';
                dogBreed = '';
                dogAge = '';
                dogPrice = '';
                contact = '';
                dogImage = null;
                (document.getElementById('dogImage') as HTMLInputElement).value = ''; // Clear the file input
                validateForm();
            } catch (error) {
                console.error('Error posting dog:', error);
                message.set('Failed to post dog.');
            }
        } else {
            message.set('Please fill out all fields and upload an image.');
        }
    }

    function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        dogImage = input.files?.[0] ?? null;
        validateForm();
    }

    $: validateForm();
</script>

{#if user}
    <div>
        <h2>Post a Dog</h2>
        <input type="text" bind:value={dogName} placeholder="Dog Name" on:input={validateForm} />
        <input type="text" bind:value={dogBreed} placeholder="Dog Breed" on:input={validateForm} />
        <input type="text" bind:value={dogAge} placeholder="Dog Age" on:input={validateForm} />
        <input type="text" bind:value={dogPrice} placeholder="Dog Price" on:input={validateForm} />
        <input type="text" bind:value={contact} placeholder="Contact (Phone Number)" on:input={validateForm} />
        <input type="file" id="dogImage" on:change={handleFileChange} />
        <button on:click={postDog} disabled={$isButtonDisabled}>Post Dog</button>
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
