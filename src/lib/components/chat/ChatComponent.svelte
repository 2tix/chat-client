<script>
    import "./ChatComponent.scss";

    let messages = [{
        text: "Hello",
        time: "12:00"
    },
        {
            text: "Hi",
            time: "12:01"
        },
        {
            text: "How are you?",
            time: "12:02"
        }];
</script>
<div class="chat-component">
    <div class="chat">
        <div class="messages">
            {#each messages as message}
                <div class="message">
                    <div class="message-text">{message.text}</div>
                    <div class="message-time">{message.time}</div>
                </div>
            {/each}
        </div>
    </div>
    <div class="input">
        <input placeholder="Type your message here..." type="text"/>
        <button>Send</button>
    </div>
</div>