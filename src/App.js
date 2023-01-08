import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faCheckCircle as farCheckCircle, faSurprise as farSurprise, faGrinSquintTears as farGrinSquintTears, 
  faSun as farSun, faSmileBeam as farSmileBeam, faHeart as farHeart, faComment as farComment, faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { faInfoCircle, faAt, faLock, faListOl, faArrowCircleRight, faStream,
  faExclamationCircle, faSearch, faCoins, faCheckCircle, faUniversity,
  faWallet, faBookReader, faHandHoldingUsd, faMoneyCheckAlt, faQuestion,
  faClipboardList, faDonate, faToggleOff, faToggleOn, faCopyright, faWifi,
  faSurprise, faTheaterMasks, faGhost, faMagic, faUser, faHashtag, faExclamation,
  faGrinSquintTears, faBasketballBall, faBomb, faLandmark, faSun, faArrowUp, faArrowDown,
  faSmileBeam, faHeart, faSkull, faMask, faBook, faUserAstronaut, faPalette,
  faChartArea, faStar, faUserSecret, faUserPlus, faEdit, faTrash, faTimes,
  faTimesCircle, faAngleDoubleLeft, faComment, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'


import Home from './Containers/HomeViewer/Home/'
import Comics from './Containers/HomeViewer/ComicScroll/Comics'
import Genre from './Containers/HomeViewer/ComicScroll/Genre'


import Creator from './Containers/Creator/'
import Canvas from './Containers/Creator/Canvas/'
import EditEpisode from './Containers/Creator/Canvas/EditEpisodes'

import ShowComic from './Containers/Reader/'
import Chapter from './Containers/Reader/Chapter'
import Options from './Containers/Options/'

import About from './Containers/InfoPages/About'
import Terms from './Containers/InfoPages/Terms'
import Privacy from './Containers/InfoPages/Privacy'
import Community from './Containers/InfoPages/Community'
import Revenue from './Containers/InfoPages/Revenue'
import CookieP from './Containers/InfoPages/CookieP'
import ChildrenP from './Containers/InfoPages/ChildrenP'
import FAQ from './Containers/InfoPages/FAQ'


import Notice from './Containers/InfoPages/Notice'
import Notice_0001 from './Containers/InfoPages/Notice/NoticeItem/Notice_0001'

import PageNotFound from './components/Widgets/PageNotFound'
// import Placeholder from './utils/Placeholder'




library.add( faInfoCircle, faAt, faLock, faExclamationCircle, faUniversity, faWifi,
  faSearch, faCoins, faCheckCircle, farCheckCircle, faWallet, faBookReader, faQuestion,
  faHandHoldingUsd, faMoneyCheckAlt, faClipboardList, faDonate, faToggleOff, faToggleOn,
  faSurprise, faTheaterMasks, faGhost, faMagic, faUser, faHashtag, faArrowUp, faArrowDown,
  faGrinSquintTears, faBasketballBall, faBomb, faLandmark, faSun, faCopyright, faStream,
  faSmileBeam, faHeart, faSkull, faMask, faBook, faUserAstronaut, faPalette, faInstagram, faYoutube,
  farSurprise, farGrinSquintTears, farSun, farSmileBeam, farHeart, faChartArea, faStar, faExclamation,
  faUserSecret, faUserPlus, faEdit, faTrash, faTimes, faTimesCircle, faAngleDoubleLeft,
  faComment, farComment, farStar, faListOl, faArrowCircleRight, faFacebookF, faTwitter, faCloudUploadAlt )

function App() {

  return (
    <Fragment>
        <BrowserRouter>
            <Switch>
                {/* <Route exact path="/" component={Placeholder} /> */}
                <Route exact path="/" component={Home} />
                <Route exact path="/creator" component={Creator} />
                <Route exact path="/creator/canvas/:comic_id" component={Canvas} />
                <Route exact path="/creator/canvas/:comic_id/:episode_id" component={EditEpisode} />
                <Route exact path="/comics" component={Comics} />
                <Route exact path="/comics/:genre" component={Genre} />
                <Route exact path="/comics/:genre/:comic" component={ShowComic} />
                <Route exact path="/comics/:genre/:comic/:episode" component={Chapter} />
                <Route exact path="/options" component={Options} />

                <Route exact path="/about" component={About} />
                <Route exact path="/terms" component={Terms} />
                <Route exact path="/privacy_policy" component={Privacy} />
                <Route exact path="/community_policy" component={Community} />
                <Route exact path="/revenue_policy" component={Revenue} />
                <Route exact path="/cookie_policy" component={CookieP} />
                <Route exact path="/children_policy" component={ChildrenP} /> 
                <Route exact path="/faq" component={FAQ} />

                <Route exact path="/notice" component={Notice} />
                <Route exact path="/notice/notice_0001" component={Notice_0001} />

                <Route component={PageNotFound} />
            </Switch>
        </BrowserRouter>
    </Fragment>
  );
}

export default App;
