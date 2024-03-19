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
          onAccept={(value: string) => onChange({ target: { name: props.name, value } })}
          overwrite
        />
      )
    }
)

export default DurationMaskAdapter
