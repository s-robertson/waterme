<template>
  <div class="app-footer">
    <div class="app-footer__content">
      <div class="app-footer__oss-attributes">
        Icons made by
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik"
          >Freepik</a
        >
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppFooter"
};
</script>

<style lang="scss">
@import "../assets/variables";

.app-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2rem;
}

.app-footer__content {
  margin: 0 auto;
  max-width: $app-max-width;
}

.app-footer__oss-attributes {
  font-size: 0.8rem;
}
</style>
