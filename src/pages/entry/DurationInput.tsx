import Input from '@mui/joy/Input'

import React from 'react'
import { IMaskInput } from 'react-imask'

interface MaskProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const DurationMaskAdapter = React.forwardRef<HTMLInputElement, MaskProps>(
    function DurationMaskAdapter(props, ref) {
      const { onChange, ...other } = props
      return (
        <IMaskInput
          {...other}
          mask="00:#0"
          definitions={{
            '#': /[0-5]/,
          }}
          inputRef={ref}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
          overwrite
        />
      )
    }
)

interface DurationInputProps {
    value: string | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DurationInput = ({value, onChange, ...rest}: DurationInputProps) => {
    <Input
        value={value}
        onChange={onChange}
        placeholder="MM:SS"
        slotProps={{ input: { component: DurationMaskAdapter } }}
        {...rest}
    />

}

export default DurationInput