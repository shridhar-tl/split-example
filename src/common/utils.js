export function getMenus(role, navigate) {
    if (role === 'admin') {
        return [
            {
                label: 'Admin',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'Home',
                        icon: 'pi pi-fw pi-plus',
                        command: () => navigate('/')
                    },
                    {
                        label: 'Salary Calculator',
                        icon: 'pi pi-fw pi-trash',
                        command: () => navigate('/salcalc')
                    }
                ]
            },
            {
                label: 'Common',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {
                        label: 'Change Password',
                        icon: 'pi pi-fw pi-align-left',
                        command: () => navigate('/changepassword')
                    },
                    {
                        label: 'Profile',
                        icon: 'pi pi-fw pi-align-right',
                        command: () => navigate('/profile')
                    }
                ]
            }
        ];
    } else {
        return [
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'Home',
                        icon: 'pi pi-fw pi-plus',
                        command: () => navigate('/')
                    },
                    {
                        label: 'Tax Calculator',
                        icon: 'pi pi-fw pi-trash',
                        command: () => navigate('/taxcalc')
                    }
                ]
            },
            {
                label: 'Common',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {
                        label: 'Change Password',
                        icon: 'pi pi-fw pi-align-left',
                        command: () => navigate('/changepassword')
                    },
                    {
                        label: 'Profile',
                        icon: 'pi pi-fw pi-align-right',
                        command: () => navigate('/profile')
                    }
                ]
            }
        ];
    }
}