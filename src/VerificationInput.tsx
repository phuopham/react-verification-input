import React from 'react';

interface VerificationInputProps {
    value?: string;
    onChange: (word: string) => void;
    shouldAutoFocus?: boolean;
    disabled?: boolean
    className?: string
}

const VerificationInput = ({
    value = '',
    onChange,
    shouldAutoFocus = false,
    disabled,
    className
}: VerificationInputProps) => {
    const [activeInput, setActiveInput] = React.useState(0);
    const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);

    const getWord = () => (value ? value.toString().split('') : []);

    React.useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 5);
    });

    React.useEffect(() => {
        if (shouldAutoFocus) {
            inputRefs.current[0]?.focus();
        }
    }, [shouldAutoFocus]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (/^[a-zA-Z]{0,5}$/.test(value)) {
            if (value.trim().length === 1) {
                changeCodeAtFocus(value);
                focusInput(activeInput + 1);
            }

        }
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => (index: number) => {
        setActiveInput(index);
        event.target.select();
    };

    const handleBlur = () => {
        setActiveInput(activeInput - 1);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const word = getWord();
        if ([event.code, event.key].includes('Backspace')) {
            event.preventDefault();
            changeCodeAtFocus('');
            focusInput(activeInput - 1);
        } else if (event.code === 'Delete') {
            event.preventDefault();
            changeCodeAtFocus('');
        } else if (event.code === 'ArrowLeft') {
            event.preventDefault();
            focusInput(activeInput - 1);
        } else if (event.code === 'ArrowRight') {
            event.preventDefault();
            focusInput(activeInput + 1);
        }
        else if (event.key === word[activeInput]) {
            event.preventDefault();
            focusInput(activeInput + 1);
        } else if (
            event.code === 'Spacebar' ||
            event.code === 'Space' ||
            event.code === 'ArrowUp' ||
            event.code === 'ArrowDown'
        ) {
            event.preventDefault();
        }
    };

    const focusInput = (index: number) => {
        const activeInput = Math.max(Math.min(4, index), 0);

        if (inputRefs.current[activeInput]) {
            inputRefs.current[activeInput]?.focus();
            inputRefs.current[activeInput]?.select();
            setActiveInput(activeInput);
        }
    };

    const changeCodeAtFocus = (value: string) => {
        const word = getWord();
        word[activeInput] = value[0];
        handleWordChange(word);
    };

    const handleWordChange = (chars: Array<string>) => {
        const word = chars.join('');
        onChange(word);
    };

    return (
        <div className='flex gap-1 items-center justify-center m-5'
        >
            {Array.from({ length: 5 }, (_, index) => index).map((index) => (
                <React.Fragment key={index}>
                    <input value={getWord()[index] ?? ''}
                        ref={(element) => (inputRefs.current[index] = element)}
                        onChange={handleChange}
                        onFocus={(event) => handleFocus(event)(index)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        autoComplete={'off'}
                        type='text'
                        disabled={disabled}
                        className={className ?? 'w-8 text-lg text-center border-2 border-blue-400 rounded-md'}
                    />
                </React.Fragment>
            ))}
        </div>
    );
};
export default VerificationInput;