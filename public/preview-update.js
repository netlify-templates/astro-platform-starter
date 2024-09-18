window.addEventListener('stackbitObjectsChanged', (event) => {
    event.preventDefault();

    // prevent refresh when unrelated objects are updated
    if (event.detail.changedObjectIds.some((o) => event.detail.visibleObjectIds.includes(o))) {
        window.location.reload();
    }
});
