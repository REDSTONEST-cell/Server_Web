import { Snackbar } from "@mui/material";
import { useState, type ComponentProps, type FC } from "react";
import useCopy from "../hooks/useCopy";
import PixelButton from "./PixelButton";

type CopyButtonProps = Omit<ComponentProps<typeof PixelButton>, 'onClick' | 'href'> & {
    text: string;
    /** 复制成功后的提示 */
    message?: string;
};

const CopyButton: FC<CopyButtonProps> = ({ text, message = '已复制', children, ...rest }) => {

    const copy = useCopy();
    const [toast, setToast] = useState<string | null>(null);

    return (
        <>
            <PixelButton
                {...rest}
                onClick={async () => setToast(await copy(text) ? message : `复制失败，请手动复制：${text}`)}>
                {children}
            </PixelButton>
            <Snackbar
                open={toast !== null}
                autoHideDuration={2500}
                onClose={() => setToast(null)}
                message={toast}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                slotProps={{
                    content: {
                        sx: {
                            fontFamily: 'inherit',
                            color: '#fff',
                            backgroundColor: 'rgba(20, 21, 27, 0.95)',
                            border: '0.15rem solid #000',
                            boxShadow: 'inset 0 0 0 0.15rem var(--rve-green)',
                            borderRadius: 0,
                        },
                    },
                }} />
        </>
    );
};

export default CopyButton;
