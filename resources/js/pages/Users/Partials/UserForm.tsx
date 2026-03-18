import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

interface Props {
    user?: any
    roles: string[]
    submitUrl: string
    method?: 'post' | 'put'
}

interface UserFormData {
    name: string
    last_name: string
    email: string
    phone: string
    position: string
    role: string
    password: string
}

export default function UserForm({ user, roles, submitUrl, method = 'post' }: Props) {

    const { data, setData, post, put, processing, errors } = useForm<UserFormData>({
        name: user?.name ?? '',
        last_name: user?.last_name ?? '',
        email: user?.email ?? '',
        phone: user?.phone ?? '',
        position: user?.position ?? '',
        role: user?.role ?? '',
        password: ''
    })

    const submit = (e: React.FormEvent) => {
        e.preventDefault()

        if (method === 'put') {
            put(submitUrl)
            return
        }

        post(submitUrl)
    }

    return (
        <form onSubmit={submit} className="space-y-6 max-w-xl">

            <div className="grid grid-cols-2 gap-4">

                <div>
                    <Input
                        placeholder="Nombre"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>
                <div>
                    <Input
                        placeholder="Apellido"
                        value={data.last_name}
                        onChange={e => setData('last_name', e.target.value)}
                    />
                    {errors.last_name && <p className="text-sm text-red-500">{errors.last_name}</p>}
                </div>

            </div>

            <div>
                <Input
                    placeholder="Correo electrónico"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">

                <Input
                    placeholder="Teléfono"
                    value={data.phone}
                    onChange={e => setData('phone', e.target.value)}
                />

                <Input
                    placeholder="Posición"
                    value={data.position}
                    onChange={e => setData('position', e.target.value)}
                />

            </div>

            <div>
                <Select
                    value={data.role}
                    onValueChange={(value) => setData('role', value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccionar rol" className='capitalize' />
                    </SelectTrigger>

                    <SelectContent>
                        {roles.map((role, index) => (
                            <SelectItem key={index} value={role} className='capitalize'>
                                {role}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Input
                    type="password"
                    placeholder="Contraseña"
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <Button disabled={processing}>
                Guardar usuario
            </Button>

        </form>
    )
}