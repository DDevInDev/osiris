import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface CommissionMeta {
    enabled: boolean
    type: string
    rate: string
    applies_on: string
    currency: string
    notes: string
}

interface Props {
    value: CommissionMeta
    errors: Record<string, string>
    onChange: <K extends keyof CommissionMeta>(key: K, value: CommissionMeta[K]) => void
}

export default function CommissionMetaFields({ value, errors, onChange }: Props) {
    return (
        <div className="space-y-4 rounded-xl border p-4">
            <div className="space-y-1">
                <h3 className="text-base font-semibold">Configuración de comisión</h3>
                <p className="text-sm text-muted-foreground">
                    Define cómo se calculará la comisión para este usuario.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <Label htmlFor="commission-enabled">¿Comisión activa?</Label>
                    <Select
                        value={value.enabled ? '1' : '0'}
                        onValueChange={(selectedValue) => onChange('enabled', selectedValue === '1')}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="¿Comisión activa?" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="1">Sí</SelectItem>
                            <SelectItem value="0">No</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors['meta.commission.enabled'] && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors['meta.commission.enabled']}
                        </p>
                    )}
                </div>

                <div>
                    <Label htmlFor="commission-type">Tipo de comisión</Label>
                    <Select
                        value={value.type}
                        onValueChange={(selectedValue) => onChange('type', selectedValue)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Tipo de comisión" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="percentage">Porcentaje</SelectItem>
                            <SelectItem value="fixed">Monto fijo</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors['meta.commission.type'] && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors['meta.commission.type']}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                    <Label htmlFor="commission-rate">Valor de comisión</Label>
                    <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Valor de comisión"
                        value={value.rate}
                        onChange={(e) => onChange('rate', e.target.value)}
                    />
                    {errors['meta.commission.rate'] && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors['meta.commission.rate']}
                        </p>
                    )}
                </div>

                <div>
                    <Label htmlFor="commission-applies-on">Aplicar sobre</Label>
                    <Select
                        value={value.applies_on}
                        onValueChange={(selectedValue) => onChange('applies_on', selectedValue)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Aplicar sobre" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="project_total">Total del proyecto</SelectItem>
                            <SelectItem value="client_first_payment">Primer pago del cliente</SelectItem>
                            <SelectItem value="invoice_paid">Factura pagada</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors['meta.commission.applies_on'] && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors['meta.commission.applies_on']}
                        </p>
                    )}
                </div>

                <div>
                    <Label htmlFor="commission-currency">Moneda</Label>
                    <Input
                        placeholder="Moneda"
                        value={value.currency}
                        onChange={(e) => onChange('currency', e.target.value)}
                    />
                    {errors['meta.commission.currency'] && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors['meta.commission.currency']}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <Input
                    placeholder="Notas internas"
                    value={value.notes}
                    onChange={(e) => onChange('notes', e.target.value)}
                />
                {errors['meta.commission.notes'] && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors['meta.commission.notes']}
                    </p>
                )}
            </div>
        </div>
    )
}