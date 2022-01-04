# Johdanto

MakeUpApp on mobiilisovellus, jolla voi hakea ja selailla meikkitietoja erilaisilla hakuehdoilla. Tuloksia voi katsella listana ja avata jonkin tiedon tarkempaan katseluun ja siirtyä webbisivulle ostamaan tuotetta. Tuotteita voi tallentaa kännykkään suosikeiksi ja poistaa suosikeista ja suosikkilistaa voi selailla ja navigoida myös sen kautta tuotesivulle.

# Käytetty teknologia

## Käytetty REST api rajapinta

Käytetyn REST api rajapinnan dokumentaatio löytyy osoitteesta:

- http://makeup-api.herokuapp.com

Kaikki tuotteet saadaan kutsulla

- http://makeup-api.herokuapp.com/api/v1/products.json

Rajapintaa voidaan kutsua erilaisilla hakuehdoilla lisäämällä loppuun hakuehdot queryparametreina, esim.

- http://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl&product_type=lipstick
- Tarkempi kuvaus mahdollisista parametreista löytyy dokumentaatiosta, kaikkia niitä ei ole tässä sovelluksessa käytetty, vaan ainoastaan mielenkiintoisimman tuntuisia.

Yhden tuotteen tiedot saadaan kutsumalla rajapintaa tuotteen id-arvolla, tätä hyödynnetään yksittäisen tuotteen sivulla.

- http://makeup-api.herokuapp.com/api/v1/products/168.json

## Sovelluksen omat komponentit

App.js
- sovelluksen käynnistävä komponentti
- 2 sisäkkäistä navigaatiota, jotka toteutettu sekä BottomTabNavigator sekä StackNavigator komponenteilla

/components/HomeScreen.js
- sovelluksen etusivu

/components/SearchScreen.js
- hakusivu, jossa käyttäjä voi syöttää hakuehdot

/components/ResultsScreen
- hakutulos-sivu, josta käyttäjä voi valita minkä rivin tietoja hän haluaa avata tarkempaan selailuun

/components/ProductScreen
- yksittäisen tuotteen tiedot näyttävä sivu
- käyttäjä voi tällä sivulla tallentaa tuotteen suosikiksi tai poistaa suosikeista
- sivulle tullaan joku hakutulosten kautta tai suosikki-sivun kautta

/components/ProductWebView
- tuotteen webbisivun näyttävä sivu

/components/FavoriteScreen
- suosikit näyttävä sivu

## Käytetyt kirjastot

- react
- react-native
- react-native-elements
- native-base
- @react-navigation/native
- @react-navigation/bottom-tabs
- @react-navigation/stack
- @expo/vector-icons
- expo-sqlite
- react-native-webview

## Navigaatio

Navigaationa on toteutettu näytön alareunaan tuleva BottomTabNavigator, jossa on etusivu, hakusivu ja suosikit-sivu. Haku- ja suosikkisivut koostuvat monista sivuista, jota on toteutettu BottomTabNivigatorin sisällä olevalla StackNavigatorilla. Eli navigaatiorakenne on seuraava:
- Home
- Search -> Results -> Product -> Product Web View
- Favorites -> Product -> Product Web View

## Tietokantakäsittely
Suosikkeja voi lisätä ja poistaa ja sovellus tekee siten select, insert ja delete lauseita SQLite tietokantaan. Tietokanta tauluun tallennetaan listanäkymillä näkyvät tiedot, sekä ko. tuotteen tuotesivun json osoite, jolla pystytään näyttämään tuotesivun tiedot. 

## Siistitty UI

Käyttöliittymänm ulkoasua on sävyltään muokattu romanttishenkiseksi naisten sovellukseksi ja sen ulkoasuun on satsattu. Etusivulla näkyvä kuvagalleria on totetettu FlatList:lla. 

SearchScreenissä on käytetty kokonaan kurssin ulkopuolista react-native-base kirjastoa, koska ko. kirjastosta löytyi Pickeriä helpommin muokattava Select komponentti, jonka ulkoasua sai helpommin muokattua mieleiseksi. Ko. sivussa käytettiin myös ko. kirjaston FormControl komponenttia alikomponentteineen. Kyseisestä kirjastosta käytettiin lukuisia eri komponentteja ja se osoittautui hyväksi kirjastoksi tehdä hyvin aseteltu käyttöliittymä. Sieltä ei kuitenkaan löytynyt komponentteja kaikkiin tarpeisiin, jonka vuoksi sitä hyödynnettiin vain tällä hakusivulla. Hakunäytöllä käytettiin myös react-native-elements kirjaston Buttonin isLoading attribuuttia näyttämään latausta, kun haku usein kesti melko pitkään.

Hakutuloslista ja suosikitlista toteutettiin react nativen FlatList:lla käyttäen react-native-elementsin ListItemiä jolla saatiin siistin ulkoasun lista. Tämä oli tuttua jo kurssilta, lisänä otettiin käyttöön Avatar-komponentti, jossa tuotteet pikkukuvan sai kivasti listan riveille.

Yhden tuotteen tuotesivusta haluttiin graafisesti näyttävä. Tämä toteutettiin jo tutulla react-native-elements kirjastolla, mutta löydettiin sieltä monia uusia hyödyllisiä ja kivan näköisiä komponentteja:
- ToastAndroid: kun tallennetaan suosikki, ilmoitetaan siitä käyttäjälle hetken näkyvällä ilmoituksella sekä lisäyksen, että poiston yhteydessä
- ScrollView: sivusta skrollattava, jos kaikki ei mahdukaan sivulle
- Rating: tuotteille saadaan rajapinnassa rating, näytetään se tähtinä
- Card: koko tuotetieto on selkeämmän näköinen tuotekorttina
- PricingCard: tuotteen hinta on näyttävä hintakorttina, jonka nappulasta pääsee navigoimaan tuotteen web näkymään
- FAB: rajapinta palauttaa tuotteen värien värikoodit listana, näytetään ne FAB-nappuloina

Tuotteen webbisivu toteutettiin react-native-webview kirjaston WebView komponentilla. Tämä oli myös kurssin ulkopuolinen kirjasto ja todella helppokäyttöinen löytö.