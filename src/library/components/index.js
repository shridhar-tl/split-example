import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { getMenus } from '../../common/utils';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { useNavigate } from 'react-router';

function MenuItems({ role, ...prop }) {
    const navigate = useNavigate();
    return (<Menubar model={getMenus(role, navigate)} {...prop} />)
}

export { MenuItems, InputText, Button };