import React, { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import theme from '../../../../../global/theme';
import { SearchInputContainer, SearchInputWrapper } from './styles';

interface SearchInputProps {
  onChange: (value: string) => void;
  value: string;
}
const SearchInput: React.FC<SearchInputProps> = (props) => {
  const { onChange, value } = props;
  const [barIsVisible, setBarIsVisible] = useState(false);

  const handleChangeBarVisibility = () => {
    setBarIsVisible((prev) => !prev);
  };
  if (barIsVisible) {
    return (
      <SearchInputWrapper>
        <SearchInputContainer
          type='text'
          placeholder='Pesquisar'
          className='search-bar'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <BiSearchAlt
          size={30}
          color={theme.colors.accent}
          className='pointer'
          onClick={handleChangeBarVisibility}
        />
      </SearchInputWrapper>
    );
  }

  return (
    <button onClick={handleChangeBarVisibility}>
      <BiSearchAlt size={30} color={theme.colors.accent} />
    </button>
  );
};
export default SearchInput;
