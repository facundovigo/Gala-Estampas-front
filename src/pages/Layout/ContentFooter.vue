<template>
  <footer class="footer">
    <div class="container ">
      <nav>
        <ul>
          <li>
            <a href="https://github.com/facundovigo/Gala-Estampas-front">
              Tip 2020-2s
            </a>
          </li>
          <li>
            <a href="https://github.com/facundovigo">
              Facu Vigo
            </a>
          </li>
          <li>
            <a href="https://github.com/sirdemian">
              sir Demian
            </a>
          </li>
        </ul>
      </nav>
      <div class="container-center">
        <a href="https://www.instagram.com/galaestampas/">
          <i class="fab fa-instagram"></i>
        </a>
        -
        <a href="https://www.facebook.com/galaestampas/">
          <i class="fab fa-facebook-f"></i>
        </a>
        - Gala Estampas
        <i class="fa fa-heart heart"></i> Regalos pensados
        &copy; {{ new Date().getFullYear() }}
      </div>
    </div>
  </footer>
</template>
<script>
export default {
}
</script>

<style>
/* .container{
  margin-bottom: 0.1%;
} */
.footer{
  
  background-color: pink;
}
.container-center{
  /* align-items: center; */
  padding: 15px;
}
</style>

