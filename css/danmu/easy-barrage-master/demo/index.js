import Barrage from '../src/barrage'
import { barrageData } from './data'
import './index.css'

const el = document.getElementsByClassName('container')[0]

const barrage = new Barrage({
	container: el,
	data: barrageData,
	barrageHeight: (el.offsetHeight - 40) / 6,
	speed: 3,
	showAvatar: true,
	infinite: true
});

barrage.init()