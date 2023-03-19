const normalInput: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 1)',
    border: '1px solid rgba(0, 0, 0, 1)',
};

const errorInput: React.CSSProperties = {
    background: 'rgba(255, 192, 203, 1)',
    border: '2px solid rgba(255, 0, 0, 1)',
};

const normalTxStyle: React.CSSProperties = {
    background: 'rgba(0, 161, 134, 0.1)',
    color: 'rgba(0, 161, 134, 1)',
    border: '1px solid rgba(0, 161, 134, 1)',
    borderRadius: '5px'
};

const tokenTxStyle: React.CSSProperties = {
    background: 'rgba(204, 154, 6, 0.15)',
    color: 'rgba(204, 154, 6, 1)',
    border: '1px solid rgba(204, 154, 6, 1)',
    borderRadius: '5px'
};

export { normalInput, errorInput, normalTxStyle, tokenTxStyle };