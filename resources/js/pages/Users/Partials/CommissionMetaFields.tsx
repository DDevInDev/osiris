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
        <h3 className="text-base font-semibold">Commission settings</h3>
        <p className="text-sm text-muted-foreground">
          Define how the commission will be calculated for this user.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="commission-enabled">Commission enabled?</Label>
          <Select
            value={value.enabled ? '1' : '0'}
            onValueChange={(selectedValue) => onChange('enabled', selectedValue === '1')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Commission enabled?" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="1">Yes</SelectItem>
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
          <Label htmlFor="commission-type">Commission type</Label>
          <Select
            value={value.type}
            onValueChange={(selectedValue) => onChange('type', selectedValue)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Commission type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="percentage">Percentage</SelectItem>
              <SelectItem value="fixed">Fixed amount</SelectItem>
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
          <Label htmlFor="commission-rate">
            {value.type === 'percentage' ? 'Commission (%)' : 'Commission amount'}
          </Label>

          <Input
            type="number"
            step="0.01"
            min="0"
            placeholder={
              value.type === 'percentage'
                ? 'Enter percentage'
                : 'Enter amount'
            }
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
          <Label htmlFor="commission-applies-on">Apply on</Label>
          <Select
            value={value.applies_on}
            onValueChange={(selectedValue) => onChange('applies_on', selectedValue)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Apply on" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="project_total">Project total</SelectItem>
              <SelectItem value="client_first_payment">Client first payment</SelectItem>
              <SelectItem value="invoice_paid">Invoice paid</SelectItem>
            </SelectContent>
          </Select>

          {errors['meta.commission.applies_on'] && (
            <p className="mt-1 text-sm text-red-500">
              {errors['meta.commission.applies_on']}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="commission-currency">Currency</Label>
          <Select
            value={value.currency}
            onValueChange={(selectedValue) => onChange('currency', selectedValue)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="MXN">MXN ($)</SelectItem>
            </SelectContent>
          </Select>

          {errors['meta.commission.currency'] && (
            <p className="mt-1 text-sm text-red-500">
              {errors['meta.commission.currency']}
            </p>
          )}
        </div>
      </div>

      <div>
        <Input
          placeholder="Internal notes"
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