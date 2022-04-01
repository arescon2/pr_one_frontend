import { Route, Routes } from "react-router-dom";
import Main from './main';
import NotFound from './views/404';
import PageView from './views/page';
import Settings from './settings';
import DicsApp from "./dics";

const RoutesBlock = () =>
	<Routes>
		<Route path="/" element={<Main />} />
		<Route path="/settings" element={<Settings />} />
		<Route path="/settings/:pagename" element={<Settings />} />
		<Route path="/settings/:pagename/:id" element={<Settings />} />
		<Route path="/page/:pagename" element={<PageView />} />
		<Route path="/dictionary" element={<DicsApp />} />
		<Route path="*" element={<NotFound />} />
	</Routes>

export default RoutesBlock;
