## Notlar

- Bu uygulama ile Vue.js routing konusunda genel olarak bilgi vermeyi amaclamaktadir.
- Herhangi bir CSS kodu kullanilmamistir.
- Vuejs2 ile yapilmistir.
- Bu uygulama `vue create vue-routing-edu` ile yapilmistir.
- Bu uygulamada routing islemleri icin `vue-router` kullanilmistir.
- Bu repository'de yapilan islemlerle ilgili hizlica goz atmak icin bir READ.ME dosyasinin en asagisindaki linkleri ve yazilari inceleyebilirsiniz.
- Tasarim ve routing konusu ile ilgili ek ozellikler icin guncellenecektir.

### **Project setup**

```
npm install
```

### **Compiles and hot-reloads for development**

```
npm run serve
```

### **Compiles and minifies for production**

```
npm run build
```

### **Lints and fixes files**

```
npm run lint
```

# Vue.js Routing Islemleri

SPA'nin olayi routing islemi olarak dusunebilirsin. SPA temel olarak bir sayfa uzerinden kullanici navigasyonlariyla farkli farkli sayfalarin ayni sayfa icerisinde gosterilme islemi diyebiliriz.

Bu islem icin `vue-router` kullanacagiz. Ilk olarak bu plugin'in projemize yuklenmesi gerekiyor. Ornek bir proje uzerinden bunu yapmak istedigim icin Vuejs folderi icerisinde `vue-router-edu` isimli bir proje olusturdum ve `WebStorm` ile bu projeyi actim. `Vuejs2` olarak projemi kurdum.

Projemi actiktan sonra `npm install --save vue-router` diyerek `vue-router`'imi projeme bagimlilik olarak ekliyorum.

<aside>
💡 `vue-router` kurarkan `—save` dedigimiz icin `package.json` dosyasi da guncellenmis oluyor.

</aside>

Bundan sonraki adim ise bunu kullanmak, biz bunu indirdik fakat tanimlamadigimiz zaman bir ise yaramiyor. Bundan dolayi `main.js` dosyasina geliyorum. `import VueRouter from "vue-router"` diyorum, import ettikten sonra proje genelinde bunu kullanmak istiyorsak Vue tarafindan kullanilabilmesi icin de  `Vue.use(VueRouter)` diyoruz.

Artik bu islemlerden sonra yonlendirme tanimlamalari yapabiliriz. Vue Router sayesinde yonlendirme tanimlamak icin bir arrayden yararlaniyoruz. Bu array icerisinde bir JavaScript objesi halinde route'larimizi, yani yonlendirmelerimizi tutuyor. Bu route tanimlamalarini `main.js` dosyasi icerisinde de yapabiliriz fakat baska bir JavaScript dosyasi uzerinden yapmamiz yonetilebilirlik acisindan daha mantikli olacaktir. Bu yuzden root folderimiza `routes.js` olarak yeni bir dosya acip tanimlamalarimizi yapacagiz.

Ilk olarak yapacagimiz islem bir degiskeni disari `export` etmemiz gerekiyor. Ve bu degiskenin adi `router` olsun. Bunun bir `array` olacagini soylemistik, icerisinde de objeler var. Bu objelerin icerisindeki `key`ler belirli ifadelere sahip olmali. Hangi `path` gelirse, hangi `component` gelecek gibi ayarlar burada belirtiliyor. Bu yuzden kullanacagimiz componentleri de burada import edip `name` property'sine gore cagirabiliriz.

Bir tane daha test etmek icin `components` folder'i icerisine icinde sadece text olan bir component yapip onu da ekleyelim. Son durumda `routes.js` dosyamiz asagidaki gibi olsun.

> `routes.js`
>
>
> ```jsx
> import Home from "./src/components/Home";
> import User from "./src/components/User";
> 
> export const routes = [
>     { path:"/", component: Home },
>     { path:"/user", component: User }
> ]
> ```
>

Isimiz bununla bitmedi, hala Vuejs bunu tanimiyor, bunu proje genelinde kullanabilmek icinde `main.js` de tanimlamamiz lazim. Oncelikle bu dosyayi `main.js` altinda import edelim. `import { routes } from "/routes"`. Peki ben bu routes'u nasil kullanacagim, `Vue.use`'dan hemen sonra bir tane `router` isimli `const` tanimlayalim ve benim router'im butun yonlendirmelerini ele alsin. `const router = new VueRouter({})` VueRouter da icerisine constructor icin bir tane obje alir . Bu constructor icerisinde vue router'imizi ozellestirebiliyoruz ya da davranisini degistirebiliyoruz.

Biz VueRouter'imizi olusturduk fakat yonlendirme tanimlamalari olmadan buradaki router bir ise yaramaz.

<aside>
💡 Eger `key` ve `value` birbirine esitse ES6 ile tekini yazsak olur o yuzden asagidaki gibi tanimlandi. `routes: routes` olarak da yazilabilirdi.

</aside>

```jsx
const router = new VueRouter({
  routes
})
```

Degisken olarak tanimladigimiz router'imizi projemiz icinde kullanabilmemiz icin Vue instance'imizda tanimlamamiz gerekir. O yuzden instance icerisine de tanimliyoruz.

```jsx
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})

```

<aside>
💡 Bu asamada uygulamayi calistirip browser uzerinden kontrol edersek linkimizin yaninda artik bir `#` isareti oldugunu goruruz, bu da route devreye girdigini gosterir. Son durumda browserdaki url su sekilde. [`http://localhost:8080/#/`](http://localhost:8080/#/)

</aside>

Browserdan kontrol ettigimizde dogru sekilde componenti basmadigini goruyoruz.  Cunku router'i tanimladik ama nerede gozukecegini Vuejs'e soylemedik iste bunun icin `App.vue` dosyasina gidiyoruz. Ve burada benim route uzerinden gelen gosterilmesini istenen componentlerimi gosterecek bir elemente ihtiyacim var. Biz bu component'i `vue-router` yardimiyla edinebiliyoruz. Burada kullanacagimiz etiketin adi `<router-view>`.

`<router-view>` dedigimiz zaman browser'da yukaridaki adres cubuguna yazdigimiz veri degistiginde `routes.js` dosyasindaki path icerisinde eslesen bir component oldugu durumunda, component direkt cagirilacak ve yerini alacak.

Route tanimlamasi yaptiktan sonra `vue-router` default olarak adres cubuguna navigate yapildiginda ya da herhangi bir sekilde sayfa degistirildiginde otomatik olarak `#` isareti koyar. Bunun sebebi SPA'nin davranisidir. Buradaki `#` isareti bize routing modu veriyor. Tabi ki de bunun calisma seklini degistirebiliyoruz, bunun icin `main.js` icerisinde `router`'i tanimladigimiz yere geliyoruz. `routes`'tan hemen sonra mode diye bir parametre ekleyelim, bu iki farkli parametre aliyor. Default olarak "`hash`", diger parametre ise "`history`". Bunun sayesinde `#` olmadan uygulamalarimizdaki yonlendirmelerimizi gerceklestirebiliyoruz.

> `main.js`
>
>
> ```jsx
> const router = new VueRouter({
>   routes,
>   mode: "history"
> })
> ```
>

Su an icin uygulamamizda girdigimiz pathleri bildigimiz icin gidip adres cubuguna yazdigimizda istedigimiz componentleri gosterdigimizi gormus olduk. Ancak gercek hayatta yonlendirmeler bu sekilde yapilmadigini biliyoruz. Bunun icin `vue-router` yardimiyla navigation islemleri yapmamiz lazim.

Navigasyon islemini yapmak icin oncelikle bir header componenti olusturalim. `components` folder'i altinda `Header.vue` diye bir dosya olusturalim ve iki ayri component'imiz icin bir header tanimlamasi yapalim.

<aside>
💡 Bir vue dosyasi `<template>`, `<script>` ve `<style>` etiketlerinden olusur. `<style>` etiketi olmak zorunda degil, style vermek istersek kullaniyoruz. Kullanilmayacaksa silinebilir.

</aside>

> `Header.vue`
>
>
> ```jsx
> <template>
> <ul>
>   <li><a href="#">Home</a></li>
>   <li><a href="#">User</a></li>
> </ul>
> </template>
> 
> <script>
> export default {
>   name: "Header"
> }
> </script>
> 
> ```
>

Simdilik yukaridaki gibi bir tanimlama bizim icin yeterli olacaktir. Bu tanimlamayi yaptiktan sonra `Header` component'imizi `App.vue` icerisinde `<router-view>` etiketimizin hemen yukarisinda tanimlama yapalim.

<aside>
💡 `<router-view>` etiketi uzerinde tanimlamamizin nedeni, uygulamamizin her yerinde ulasilabilir olmasini istedigimiz icin.

</aside>

Asagidaki gibi `App.vue` icerisinde kullanmak istedigimiz componentleri register edebiliriz. Burada vue'nun bir ozelligi olarak component ismini `appHeader` olarak yazmis olsak bile `<app-header>` ya da `<appHeader>` etiketi olarak kullanabiliriz. Gelistirici ortami oldugu icin vue onu browserlarin anlayacagi sekilde compile ediyor, herhangi bir sikinti olmuyor.

Navigasyonumuzu hazirladik, `Home` ve `User` yonlendirmelerime tikladigimda ilgili route'umun calismasini saglamak icin `<li>` etiketimin icindeki `<a>` taginden yapacagim, bu yapinin aynisini CSS kurallarim, HTML hiyararsim bozulmamasi icin korumam lazim.  Bu is icin `vue-router` tarafindan sunulan bir diger etiketi kullanacagim, bu etiket `<router-link>`.

<aside>
💡 `<router-link>` bizim aslinda URL'e gidecek linkimiz. Bizim icin SPA'larda routelar arasinda dolasmamizi saglayan element. Bir cok ozelligi var, nereye gideyim, hangi elemente sahip olayim, hangi class'a sahip olayim, hangi kelime geldiginde islem yapayim gibi.

</aside>

Ilk olarak cok basit bir yol ile gidelim. Benim yapimin bozulmamasini istiyordum, sahip olacagin element `<li>` olacak diyelim, yani Vue seni render ettiginde `<li>` elementine buruneceksin. Bunu demek icinde `<router-link tag="li">`  dememiz yeterli. Ve icerisine de  `<a>` elementi alacak. Peki ben bu elemente tiklanildiginda nereye gidecegini nasil anlacagim onun icinde `<router-link>` icerisinde `to` attribute'u ile verebiliyorum. `<router-link to="/" tag="li"><a>Home</a>` . Bunun ile to ile eslesen bir path'im varsa ona yonlendirmis oldum.

<aside>
💡 `routes.js` dosyasinda tanimladigimiz path'teki `"/"` ile `""` arasinda hicbir fark yok. Genel kullanim olarak `"/"` tercih ediliyor.

</aside>

Digerini de bu sekilde yaptiktan sonra son durumda `Header.vue` dosyamiz asagidaki gibi olmali.

> `Header.vue`
>
>
> ```jsx
> <template>
> <ul>
>   <router-link to="/" tag="li"><a>Home</a></router-link>
>   <router-link to="/user" tag="li"><a>User</a></router-link>
> </ul>
> </template>
> 
> <script>
> export default {
>   name: "Header"
> }
> </script>
> 
> ```
>

<aside>
💡 Daha once konustugumuz gibi `<router-link>` in bi kac ek ozelligi var bunlardan bir tanesi `active-class` . `active-class` attiribute'u ile Vue hangi linke tikladigimi ve hangisinin active oldugunu bildigi icin, active olundugunda eger bir CSS ile farkli bir gosterim yapiyorsam active oldugunda hangi class'i alacagini soyleyebiliyorum. Burada onemli nokta, `"/"` diye bir yolumuz da oldugu icin `"/"` icin tanimlanan navigation'da calisacaktir bu yuzden `exact` attribute'u ile, router'daki ifadenin tamami uyusuyorsa demis oluyoruz. Eger bir proje'de isine yarayacaksa `<router-link>` dokumanini detayli inceleyebilirsin.

</aside>

Template uzerinden `<router-link>` ile navigation islemleri oldukca basit. Bazen uygulamamizdaki bir sonuca gore baska bir sayfaya baska bir component'e yonlendirme yapmak isteyebiliriz. Aslinda bu cok sik rastlanan bir senaryo. Bu islemi bir ornekle deneyelim.

Ornegin `User` component'inin oldugu yerde bir buton daha tanimlayalim ve buton araciligiyla anasayfamiza yani `"/"` yonlenelim. Bunu yapmak icin `User` component'ine bir buton tanimlayalim ve butona tikladiginda navigate islemi yapilacak olarak dusunelim, bunu vuejs'de `methods` tanimlamasi ile yapabiliriz. Butona bastigimda bi method trigger etmek icin click eventini dinlememiz lazim ve orada da methodumuzu cagirmamiz gerekiyor. Simdilik path yonlendirmesini yapmadan belirttigim seyleri `User.vue` dosyasina ekleyeyim. Hatta bu tanimlamis oldugumuz function'in bir dogru calistigini gormek icin de simdilik bir `alert()` ekleyebiliriz. `User.vue` dosyasinin son hali asagidaki gibi.

> `User.vue`
>
>
> ```jsx
> <template>
>   <div>
>     <p>User</p>
>     <button @click="navigateToHome()">Go to Home</button>
>   </div>
> 
> </template>
> 
> <script>
> export default {
>   name: "User",
>   methods:{
>     navigateToHome(){
> 			alert()
>     }
>   }
> }
> </script>
> 
> <stylescoped>
> 
> </style>
> ```
>

<aside>
💡 `<template>` etiketi bir tane root dosyasi istedigi icin yeni bir `div` acarak `<p>` ve `<button>` elementlerini wrap ettik.

</aside>

Yonlendirme islemi yapmak icin daha onceki bilgilerimizden yararlanacagiz. Vue instance icerisinde `this` keywordunu kullanarak `this.$router` dedigimizde artik router'a erisebiliyoruz. Sonrasinda da `push()` methodu kullarak bu yonlendirme islemini yapabiliriz. `.push()` dedikten sonra artik bu method bizim herhangi bir `routes.js` icerisinde tanimlamis oldugumuz path'lerden bir tanesine gitmemizi saglar bunu yaparken uc farkli yontemle yapabiliriz.

1. String olarak path degeri yazilabilir,
2. Icerisine bir obje alir, bu obje de routes tanimi yaparken kullanmis oldugumuz gibi calisir`{ path:"/" }`,
3. Yine bir obje olarak verebiliriz, bu sefer isimlendirilmis route ile bu hangi path'e gitmek istiyorsak bunun ismini verebiliriz. Tabi bunu yapabilmek icin, `routes.js` dosyasindaki objemiz icerisinde `name: "home"` gibi belirtmemiz lazim.

```jsx
  methods:{
    navigateToHome(){
			// this.$router.push("/")
      // this.$router.push({path: "/"})
			this.$router.push({ name: "home"})
    }
  }
}
```

Bu zamana kadar componentler arasinda gezinirken hep statik bir route yonetimi ile ilerledik. Gercek hayatta ornegin twitter dusun, her bir tweetin bir de `ID` bilgisi var ve bu `ID` bilgisine gore bir detay sayfasina erisebiliyoruz. Su an icin bizim `routes.js` dosyamizda `ID` parametresini karsilayacak bir yapimiz yok. Onu yapmak da son derece basit. `routes.js` dosyasina gidip path kisminda `"/user/:id"` dersek artik adres cubuguna "`/user/1`" ya da "`/user/123`" -*gibi "`/user/`"dan sonra gelecek olani `ID` olarak kullan demis oldugumuz icin*- yazdigimizda da gosterecegimiz component'imizi yonetebiliriz. Tabi bunu da yapabilmek icin bu component uzerinde bu dosyayi okuyabilmemiz gerekiyor ki kullanicaya ozel bir template render edebileyim.  Kullaniciya yollamis oldugu ID'ye gore sayfa render etmek istedigimiz ve bunu `User` component'i icerisinde yaptigimiz icin `User.vue` dosyasinda bunu okumamiz lazim.

Ornek olmasi acisindan `User.vue` icerisine bir tane daha `<p>` etiketi ekleyerek string interpolation seklinde `id` mizi yazalim. Burada string interpolation seklinde tanimladigimiz id bilgisini de alabilmek icin vue instance'i icerisinde bir data methodu olusturalim ve id return edelim. Bu id bilgisini de `route` uzerinden alacagiz. `Router`'a erismek icin daha once `this.$router` kullanmistik. `Route`'a gonderilen parametreyi almamizi saglayan kisim ise `this.$route`. Bu componenti ekrana getiren route'um parametrelerinden id'yi almamiz gerekiyor. Bunu da `this.$route.params.id` ile alabiliyoruz. ID'yi getir degerini benim vue instance icerisinde tanimlamis oldugum id'ye esitle demis olduk.

> `routes.js`
>
>
> ```jsx
> import Home from "./src/components/Home";
> import User from "./src/components/User";
> 
> export const routes = [
>     { path:"/", component: Home, name: "home"},
>     { path:"/user/:id", component: User, name: "user" }
> ]
> ```
>

> `User.vue`
>
>
> ```html
> <template>
>   <div>
>     <p>User</p>
>     <p>Yolladigin ID: {{ id }}</p>
>     <button@click="navigateToHome()">Go to Home</button>
>   </div>
> 
> </template>
> 
> <script>
> export default {
>   name: "User",
>   data(){
>     return {
>       id: this.$route.params.id
>     }
>   },
>   methods:{
>     navigateToHome(){
> 			// this.$router.push("/")
>       // this.$router.push({path: "/"})
> 				 this.$router.push({ name: "home"})
>     }
>   }
> }
> </script>
> 
> ```
>

Fark ettiyseniz artik "`/user`"a gittigimde herhangi bir component render etmiyor cunku routes dosyasinda "`/user/`"dan sonra bir ID bekliyor. Eger "`/user/`" dan sonra herhangi bir deger girersem componentim render ediliyor ve `Yolladigin ID:` kisminda gonderdigim ID bilgisini gorebiliyorum.

Yukaridaki islemi browser uzerinden yaptigimizda herhangi bir sorun olmadan calistigini goruyoruz, bir de bunu `Header` componenti uzerinden yonlenecek sekilde yapalim, bunun icin `Header` component'ine bir yeni `<router-link>` etiketi ekleyelim, bir tanesi "`/user/1`" bir tanesi de "`/user/2`" ye gitsin. Bu gercek hayatta cok sik rastladigimiz bir durum.

> `Header.vue`
>
>
> ```html
> <template>
> <ul>
>   <router-linkto="/" tag="li"><a>Home</a></router-link>
>   <router-linkto="/user/1" tag="li"><a>User 1</a></router-link>
>   <router-linkto="/user/2" tag="li"><a>User 2</a></router-link>
> </ul>
> </template>
> ```
>

Header'da duzenlemeleri yaptiktan sonra uygulamamizi browser'da test ettigimizde aslinda cok da dogru calismadigini goruyoruz. Cunku User 1'e tikladiktan sonra User 2'ye bastigimda Yolladigin ID kismi degismedigini goruyoruz. Halbuki adres cubugunda ID'nin guncellendigini goruyorduk.



<aside>
💡 Bunun sebebi aslinda component'imizin coktan render edilmis olmasi ve bundan dolayi da `User.vue` dosyasinda yazdigim ID bilgisi coktan set edildi.

</aside>

Bu sorunu duzeltmek icin `reactivity` burada yardimimiza kosuyor. `User.vue` dosyamda `watch` yardimi sayesinde bunu cozebiliyorum. `watch` ile bir property'i izleyebiliyorduk ve degeri degistigi anda bir aksiyon alabiliyorduk. Burada degeri degisen kisim `$route.param.id` ama data kismi tekrar render edilmedigi icin bunu kullanamiyoruz, bundan kaynakli olarak da "`$route`" un degeri degistigi zaman bir aksiyon alalim. Bu da iki parametre alir, `to` ve `from`. Bunun yaptigi islemi her iki yonlendirme de ayni component icerisinden aldigindan, eski componenti oldurup yenisini render etmek. Detayli bilgi icin asagidan bakabilirsin.

Degisen value'muz icin `to` yu kullanacagiz. watch'imizin icine `this.id` diyerek buradaki vue instance'imiza eristik, bu degeri de `to.params.id`yaparsak bu sorunu cozmus oluruz.

<aside>
💡 `from` parametresini simdilik kullanmayacagim icin yazmiyorum. Aksi halde kullanilmadigi icin hata verecektir.

</aside>

```jsx
watch: {
  "$route"(to){
    this.id = to.params.id
  }
}
```

Buraya kadar her sey tamamsa biraz daha detaya inebiliriz. Gercek hayattan ornekleri dusundugumuzde, Home'a tikladigimizda homepage yuklenirken User'a tikladigimizda da ilgili userlarin bir listesinin gelmesini ve bu liste uzerinden de bir user'a tikladigimizda detay sayfasinin acilmasini bekleriz. Bazende bu detay sayfasini editlemek isteyebiliriz. Bunu nested routes yapisi ile yapabiliriz. Ornek uzerinden gormek icin components folderimizda `User` componentimize ek olarak `UserStart`, `UserDetail` ve `UserEdit` olmak uzere uc tane daha component dosyasi olusturalim.

> `UserStart.vue`
>
>
> ```jsx
> <template>
> <ul>
>   <li>User 1</li>
>   <li>User 2</li>
>   <li>User 3</li>
>   <li>User 4</li>
>   <li>User 5</li>
>   <li>User 6</li>
> </ul>
> </template>
> 
> <script>
> export default {
>   name: "UserStart"
> }
> </script>
> 
> ```
>

> `UserDetail.vue`
>
>
> ```jsx
> <template>
> <p>User Detail</p>
> </template>
> 
> <script>
> export default {
>   name: "UserDetail"
> }
> </script>
> 
> ```
>

> `UserEdit.vue`
>
>
> ```jsx
> <template>
> <p>User Edit</p>
> </template>
> 
> <script>
> export default {
>   name: "UserEdit"
> }
> </script>
> 
> ```
>

Yeni componentlerimizi olusturduktan sonra var olan `User` componentimizde artik liste seklinde farazi userlarimizi ekleyelim. Ona gecmeden once `Header.vue` dosyamizda ornek olmasi acisindan yaptigimiz User 1 ve User 2 yonlendirmelerimizi kaldiralim herhangi bir yol gondermeden `User` componentini cagirsin.

Simdi de `routes.js` dosyamizdaki `ID` parametresi alan path'i de temizleyip "`/use`r" yapalim. Ustelik de bunun da kendine ait child routelari olacak. Yani user'a ait route'lari tanimlamak yerine user altindaki route tanimlamasiyla bunu yapacagim. Bizim userla ilgili dort tane ana componentimiz var. `User`, `UserStart`, `UserDetail` ve `UserEdit`.

User pathinde children diye bir property tanimlayarak baslayalim, bu children property'si bir arrayden olusur. Kendi icerisinde path tanimlamasindaki gibi bir obje alacak.

<aside>
💡 Farkli pathler icin farkli componentler cagirmak istedigimiz icin `routes.js` icersinde de bu componentleri import etmemiz gerekmekte.

</aside>

Eger path "`/user`" geldikten sonra herhangi bir ibare belirtilmemisse, ekrana yukleyecegin component'in adi `UserStart`. Ayni sekilde, eger gelen path uzerinde bir `ID` varsa o zaman calisacak componentin adi `UserDetail` olacak. Bir diger path'te ise eger `ID` gelirse ve ondan sonra `edit` diyorsa o zaman burada render edecegin componentin adi `UserEdit`.

> `routes.js`
>
>
> ```jsx
> export const routes = [
>     {path: "/", component: Home, name: "home"},
>     {
>         path: "/user", component: User, name: "user", children: [
>             {path: "", component: UserStart},
>             {path: ":id", component: UserDetail},
>             {path: ":id/edit", component: UserEdit},
>         ]
>     }
> ]
> ```
>

`routes.js` dosyasinda bu degisikligi yaptiktan sonra yapilmasi gereken tek bir sey kaldi. Onun icin de User componentine gidip degisikliklerimizi yapalim.

<aside>
💡 Eger bir component'te child'lar varsa `<router-view>` kullanmak zorundayiz. Bu `<router-view>` tanimlamasini da yine main component icerisinde yani User componentinde tanimlamamiz gerekmekte.

</aside>

Tum bu islemleri yaptiktan sonra browser uzerinde testlerimizi yaptigimizda herhangi bir sorun olmadigini goruyoruz. Su an icin tek sikintimiz bu yeni olusturdugumuz componentler arasinda navigasyon yapamiyoruz. Navigasyon daha once yapmistik, yine ayni sekilde kullanimla burada da componentler arasi iletisimi saglayabiliriz.

`UserStart` component'imize gidip `li` elementlerimizi `<router-link>` elementlerine cevirelim.

> `UserStart.vue`
>
>
> ```jsx
> <template>
> <ul>
>   <router-link to="/user/1" tag="li" exact><a>User 1</a></router-link>
>   <router-link to="/user/2" tag="li" exact><a>User 2</a></router-link>
>   <router-link to="/user/3" tag="li" exact><a>User 3</a></router-link>
>   <router-link to="/user/4" tag="li" exact><a>User 4</a></router-link>
> </ul>
> </template>
> 
> <script>
> export default {
>   name: "UserStart"
> }
> </script>
> ```
>

<aside>
💡 Eger bu user listesi bir `API` uzerinden bize donseydi, kac tane dondugu bilgisi dinamik bir veri oldugu icin `v-for` ile bunu sayfada render edecektik.

</aside>

`UserDetail` sayfasinda Home butonumuz harici bir de edit sayfasina yonlendirecek bir `<router-link>` imiz olsun boylelikle edit sayfasina da erisebiliriz.  Buradadaha once yaptigimizdan farkli olarak bizim `user/:id/edit` sayfasina gitmemiz gerekiyor. `ID` bilgisini `$route.params.id` ile almistik sonrasinda da `/edit` eklememiz gerekiyor dolayisiyla burada bir string concatenation yapacagiz. Bir de `ID` bilgisi dinamik oldugu icin `to` parametresini bind etmemiz gerekecek kisa kullanimi ile `:to` ile bunu cozebiliyoruz. Son durumda UserDetail componentimize eklemis oldugumuz yonlendirme su sekilde `<router-link *tag*="button" *:to*="'/user/' + $route.params.id + '/edit'">Edit User</router-link>` oldu.

Bunun yerine cok daha profesyonel bir yontem ile yani name route kullanarak istedigimiz bir isimlendirme ile istedigimiz bir route'u direkt calistirabiliyoruz. Bu yuzden child routelari tanimladigimiz routes.js dosyasinda UserEdit componentini tanimladigimiz objeye name diye bir property daha ekleyip `{path: ":id/edit", component: UserEdit, name: "userEdit"}` yapalim. Daha sonrasinda `UserDetail` komponentimizde edit icin gonderecegimiz kisimda obje olarak path verelim. Ikinci bir property olarak da `params` yazalim. Bu da ben bu componente bir parametre yollayacagim demek. `params` property de birden fazla veri alabilecegi icin de obje bekliyor. Bu `ID` bilgisini de yine `$route.params.id` ile aliyorum boylelikle bu sorunum da cozulmus oldu. `<router-link *tag*="button" *:to*="{name: 'userEdit', params: {id: $route.params.id} }">Edit User</router-link>`

<aside>
💡 Tanimladigimiz route'lar sayesinde navigasyon islemlerini basariyla gerceklestirebiliyoruz. Peki zaman icerisinde sayfalarimizin pathleri degisti ve kullanici elle daha onceden bildigi bir path'e gitmek istiyor bu durumda su an kullanilan path'e yonlendirmek icin redirect property'si kullanilabilir. `routes.js` icerisinde `{ path: '/a', redirect: '/b' }` olarak tanimlama yapabiliriz. Ayni sekilde named route ile de calisiyor. `{ path: '/a', redirect: { name: 'foo' }}`

Yine ayni sekilde eger `routes.js` dosyamizdaki hicbir path'e uymayan bir yola gidilmek isteniyorsa yine bir component goremeyecektir, bunun yerine eger tanimlanan routes icerisinden herhangi birine uyan bir yol yoksa wildcard ile istedigimiz bir componente yonlendirebiliriz. `{ path: "*", redirect: "/"}`

</aside>

Vuejs'de routing islemleriyle ilgili temel olarak ozellikleri gorduk, artik SPA olarak kullanicilarin navigasyon islemlerini yapabiliyoruz. Son olarak biraz daha gelismis ve buyuk capli projelerde kullanabilecegimiz bir ozellikten bahsetmek istiyorum. Su an icin uygulamamizi baslattigimizda User component'ini kullanmasak bile su an `webpack` tarafindan her sey tek dosya olarak bundle edildigi icin projenin icerisinde kullanilan butun componentler client tarafinda load ediliyor. Kucuk uygulamalarda bunun dezavantajlarini gormeyiz ancak proje buyudukce bu da bir maliyet olusturuyor. Bu maliyet problemimizden kurtulmamiza yarayacak bir cozum var o da `lazy load`.

<aside>
💡 `Lazy load` bize hangi component'i hangi zamanda kullanacaksak o zaman yuklememize firsat sunuyor. Bu islem webpack tarafindan yapiliyor. Bu islemi tum componentleri yukledigimiz routes.js dosyasinda yapiyoruz.

</aside>

### Ek Kaynaklar:

<aside>
💡 ****What are single-page applications?****

In the history of web development, traditionally, web applications were composed of more than one page, each having links between them. An HTTP request to a web server would be made at each page load, code would be executed on a server, and then an entire page would be rendered. Each page would have server-side back-end code running, performing actions such as a database query or a call to remote API.

A SPA, or single-page application, on the other hand, is a web application that is entirely composed of just one web page, a single file on the filesystem, such as `index.html`. Requests for different “pages” (or “views”) are handled through AJAX (JavaScript) and *replace* parts of the page, potentially saving on bandwidth. This technique, therefore, decreases the time required to switch between pages and different parts of the application by eliminating the need to continually download parts of the single-page app, like the template, which doesn't often change.

Additionally, through the use of the browser's *History API*, the URL in the address bar can be changed with each page. Because of this, the browser history will act just like it does on a traditional website. This allows you to use the forward and backward arrows to go back and forth between pages.

A SPA must be created using JavaScript, though, so there is a bit of a learning curve involved. Additionally, sometimes browser compatibility is an issue for some of the latest features. Lastly, since all of the source code for a single page application is exposed, certain private aspects of the page such as API tokens must be hidden.

</aside>

<aside>
💡 Routing Modes ile ilgili detayli bilgi:

# **HTML5 History Mode**

The default mode for `vue-router` is *hash mode* - it uses the URL hash to simulate a full URL so that the page won't be reloaded when the URL changes.

To get rid of the hash, we can use the router's **history mode**, which leverages the `history.pushState` API to achieve URL navigation without a page reload:

`const router = new VueRouter({
mode: 'history',
routes: [...]
})`

When using history mode, the URL will look "normal," e.g. `http://oursite.com/user/id`. Beautiful!

Here comes a problem, though: Since our app is a single page client side app, without a proper server configuration, the users will get a 404 error if they access `http://oursite.com/user/id` directly in their browser. Now that's ugly.

Not to worry: To fix the issue, all you need to do is add a simple catch-all fallback route to your server. If the URL doesn't match any static assets, it should serve the same `index.html` page that your app lives in. Beautiful, again!

---

### **mode**

- type: `string`
- default: `"hash" (in browser) | "abstract" (in Node.js)`
- available values: `"hash" | "history" | "abstract"`

  Configure the router mode.

  - `hash`: uses the URL hash for routing. Works in all Vue-supported browsers, including those that do not support HTML5 History API.
  - `history`: requires HTML5 History API and server config. See **[HTML5 History Mode](https://router.vuejs.org/guide/essentials/history-mode.html)**.
  - `abstract`: works in all JavaScript environments, e.g. server-side with Node.js. **The router will automatically be forced into this mode if no browser API is present.**

---

</aside>

<aside>
💡 `<router-link>` ile ilgili detayli bilgi:

`<router-link>` is the component for enabling user navigation in a router-enabled app. The target location is specified with the `to` prop. It renders as an `<a>` tag with correct `href` by default, but can be configured with the `tag` prop. In addition, the link automatically gets an active CSS class when the target route is active.

`<router-link>` is preferred over hard-coded `<a href="...">` for the following reasons:

- It works the same way in both HTML5 history mode and hash mode, so if you ever decide to switch mode, or when the router falls back to hash mode in IE9, nothing needs to be changed.
- In HTML5 history mode, `router-link` will intercept the click event so that the browser doesn't try to reload the page.
- When you are using the `base` option in HTML5 history mode, you don't need to include it in `to` prop's URLs.
</aside>

<aside>
💡 **Reacting to Params Changes**

One thing to note when using routes with params is that when the user navigates from `/user/foo` to `/user/bar`, **the same component instance will be reused**. Since both routes render the same component, this is more efficient than destroying the old instance and then creating a new one. **However, this also means that the lifecycle hooks of the component will not be called**.

To react to params changes in the same component, you can simply watch the `$route` object:

```jsx
const User = {
  template: '...',
  watch: {
    $route(to, from) {
      // react to route changes...
    }
  }
}
```

</aside>

<aside>
💡 Catch All Undefined Paths with a Wildcard Route in Vue

We can use the "*" symbol to catch all matching paths. However, there are ways to do this that will override other paths. We want to avoid those.

</aside>

## 🔗 Links

[Vue.js Routing Islemleri](https://medium.com/@bilgihankose/vue-js-routing-islemleri-5d08aa7c283c)

[https://github.com/bilgihankose/vue-router-edu](https://github.com/bilgihankose/vue-router-edu)

[](https://www.udemy.com/course/sifirdan-ileri-seviye-vuejs-2-vuex-vue-router-egitim-seti/learn/lecture/11466364#questions)

[Make a Single Page Application (SPA) with Vue.js and Sanity | Sanity.io guide](https://www.sanity.io/guides/create-a-single-page-application-with-vuejs-and-sanity)

[Catch All Undefined Paths with a Wildcard Route in Vue](https://egghead.io/lessons/vue-js-catch-all-undefined-paths-with-a-wildcard-route-in-vue)

[Dynamic Route Matching | Vue Router](https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes)

[API Reference | Vue Router](https://router.vuejs.org/api/#router-link)

[HTML5 History Mode | Vue Router](https://router.vuejs.org/guide/essentials/history-mode.html#html5-history-mode)

[](https://router.vuejs.org/api/#mode)