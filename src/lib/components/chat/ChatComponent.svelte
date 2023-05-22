<script>
    import "./ChatComponent.scss";
    // we import the scss file here so that it is bundled with the component
    import {onMount} from "svelte";
    // we import the onMount function from svelte, which is called when the component is mounted
    import {messagesStore} from "../../utils/store.js";
    // we will use the messagesStore to get the messages when they arrive
    import {connect, sendMessage} from "../../utils/server.js";
    // we import the connect and sendMessage functions from the server.js file

    let messages = [];

    onMount(() => {
        // we call the onMount function, which is called when the component is mounted
        connect();
        // we call the connect function, which connects to the server
        messagesStore.subscribe(value => {
            // we subscribe to the messagesStore, which is updated when a new message arrives
            messages = value;
            // we set the messages variable to the new value
        });
    });
</script>
<div class="chat-component">
    <div class="chat">
        <div class="messages">
            {#each messages as message}
                <!-- We go through every message in the storage -->
                <div class="message {message.author === 'you' ? 'right' : ''}">
                    <!-- We add the class "right" to the message if it is from the user -->
                    <div class="message-text">{message.text}</div>
                </div>
                <div class="message-meta {message.author === 'you' ? 'right' : ''}">{(message.author === "you" ? message.time : " - " + message.author + ` (${message.time})`)}</div>
                <!-- We add the class "right" to the message meta if it is from the user, we also don't show the author of the message if its our current user -->
            {/each}
        </div>
    </div>
    <div class="input">
        <input placeholder="Type your message here..." on:keypress={e => {
            if(e.key === "Enter" && e.target.value !== "" && e.target.value.trim() !== "") {
                // we check if the user pressed enter and if the input is not empty
                sendMessage(e.target.value);
                e.target.value = "";
            }
        }} type="text"/>
        <button><img width="20px" src="arrow.svg" on:click={e => {
            if( e.target.value !== "" && e.target.value.trim() !== "") {
                // we check if the input is not empty
               sendMessage(e.target.parentNode.parentNode.firstChild.value);
               e.target.parentNode.parentNode.firstChild.value = "";
            }
        }} alt="Send"/></button>
    </div>
</div>