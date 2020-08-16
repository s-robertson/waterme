<template>
  <div class="c-app-footer">
    <div class="c-app-footer__content">
      <div class="c-app-footer__oss-attributes">
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
@import "../assets/scss/variables";

.c-app-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2rem;
  background: $brand-secondary;
}

.c-app-footer__content {
  margin: 0 auto;
  max-width: $app-max-width;
  padding: 0 1.5rem;
  height: 2rem;
  display: flex;
  align-items: center;
}

.c-app-footer__oss-attributes {
  font-size: 0.8rem;
}
</style>
