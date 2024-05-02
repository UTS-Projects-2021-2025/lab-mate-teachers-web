<script lang="ts" setup>
type LHeroProps = {
    title: string;
    imgSrc: string;
    imgAlt: string;
};

defineProps<LHeroProps>();
</script>

<template>
    <div class="container col-xxl-8 px-4 py-5">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div class="col-10 col-sm-8 col-lg-6">
                <img
                    :src="imgSrc"
                    class="d-block mx-lg-auto img-fluid"
                    :alt="imgAlt"
                    width="700"
                    height="500"
                    loading="lazy"
                />
            </div>
            <div class="col-lg-6">
                <h1 class="display-5 fw-bold lh-1 mb-3">{{ title }}</h1>
                <p class="lead"><slot /></p>
                <div class="d-grid gap-3 d-md-flex justify-content-md-start">
                    <button
                        type="button"
                        class="btn btn-primary btn-lg px-4 me-md-2"
                    >
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
