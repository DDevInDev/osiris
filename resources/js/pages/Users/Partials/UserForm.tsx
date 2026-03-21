import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import CommissionMetaFields from './CommissionMetaFields'

interface CommissionMeta {
    enabled: boolean
    type: string
    rate: string
    applies_on: string
    currency: string
    notes: string
}

interface UserMeta {
    commission: CommissionMeta
}

interface UserFormData {
    name: string
    last_name: string
    email: string
    phone: string
    position: string
    role: string
    password: string
    meta: UserMeta
}

interface UserData {
    name?: string
    last_name?: string
    email?: string
    phone?: string
    position?: string
    role?: string
    meta?: Partial<UserMeta>
}

interface Props {
    user?: UserData
    roles: string[]
    submitUrl: string
    method?: 'post' | 'put'
}

const defaultCommissionMeta: CommissionMeta = {
    enabled: false,
    type: 'percentage',
    rate: '',
    applies_on: 'project_total',
    currency: 'MXN',
    notes: '',
}

export default function UserForm({
    user,
    roles,
    submitUrl,
    method = 'post',
}: Props) {
    const { data, setData, post, put, processing, errors } = useForm<UserFormData>({
        name: user?.name ?? '',
        last_name: user?.last_name ?? '',
        email: user?.email ?? '',
        phone: user?.phone ?? '',
        position: user?.position ?? '',
        role: user?.role ?? '',
        password: '',
        meta: {
            commission: {
                ...defaultCommissionMeta,
                ...(user?.meta?.commission ?? {}),
                rate:
                    user?.meta?.commission?.rate !== undefined
                        ? String(user.meta.commission.rate)
                        : defaultCommissionMeta.rate,
            },
        },
    })

    const isCommissioner = data.role === 'commissioner'

    const handleCommissionChange = <K extends keyof CommissionMeta>(
        key: K,
        value: CommissionMeta[K],
    ) => {
        setData('meta', {
            ...data.meta,
            commission: {
                ...data.meta.commission,
                [key]: value,
            },
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (method === 'put') {
            put(submitUrl)
            return
        }

        post(submitUrl)
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Input
                        placeholder="First name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                </div>

                <div>
                    <Input
                        placeholder="Last name"
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                    />
                    {errors.last_name && (
                        <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>
                    )}
                </div>
            </div>

            <div>
                <Input
                    placeholder="Email address"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Input
                        placeholder="Phone"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                    />
                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                </div>

                <div>
                    <Input
                        placeholder="Position"
                        value={data.position}
                        onChange={(e) => setData('position', e.target.value)}
                    />
                    {errors.position && (
                        <p className="mt-1 text-sm text-red-500">{errors.position}</p>
                    )}
                </div>
            </div>

            <div>
                <Select
                    value={data.role}
                    onValueChange={(value) => setData('role', value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a role" className="capitalize" />
                    </SelectTrigger>

                    <SelectContent>
                        {roles.map((role) => (
                            <SelectItem key={role} value={role} className="capitalize">
                                {role}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {errors.role && (
                    <p className="mt-1 text-sm text-red-500">{errors.role}</p>
                )}
            </div>

            {isCommissioner && (
                <CommissionMetaFields
                    value={data.meta.commission}
                    errors={errors as Record<string, string>}
                    onChange={handleCommissionChange}
                />
            )}

            <div>
                <Input
                    type="password"
                    placeholder={method === 'put' ? 'New password (optional)' : 'Password'}
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                />
                {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
            </div>

            <Button disabled={processing}>
                {method === 'put' ? 'Update user' : 'Save user'}
            </Button>
        </form>
    )
}