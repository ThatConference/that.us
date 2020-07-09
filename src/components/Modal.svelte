<!-- <script>
    import { createEventDispatcher, onDestroy } from 'svelte';

	const dispatch = createEventDispatcher();
    const close = () => dispatch('close');
    
    const handle_keydown = e => {
        if (e.key === 'Escape') {
            close();
            return;
        }

        if (e.key === 'Tab') {
            // trap focus
            const nodes = modal.querySelectorAll('*');
            const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0);

            let index = tabbable.indexOf(document.activeElement);
            if (index === -1 && e.shiftKey) index = 0;

            index += tabbable.length + (e.shiftKey ? -1 : 1);
            index %= tabbable.length;

            tabbable[index].focus();
            e.preventDefault();
        }
	};

</script><svelte:window on:keydown={handle_keydown}/>

<div class="modal-background" on:click={close}></div>

<button autofocus on:click={close}>close modal</button> -->
