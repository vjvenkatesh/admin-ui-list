import AdminUi from '../components/AdminUi';
import {render, fireEvent, screen} from '@testing-library/react'



test("table header with Name,Email,Role should be there in page load",()=>{
    render(<AdminUi />);
    setTimeout(()=>{
        const nameElement=screen.getByText(/name/i);
        const emailElement=screen.getByText(/email/i);
        const roleElement=screen.getByText(/role/i);
        expect(nameElement).toBeInTheDocument();
        expect(emailElement).toBeInTheDocument();
        expect(roleElement).toBeInTheDocument();
    },500);
    
})



test("data should be loaded when adminui component mounded",()=>{
    render(<AdminUi />);
    setTimeout(()=>{
        const tdElements=screen.getAllByRole("cell");
        const tdCount = tdElements.length;
        expect(tdCount).toBe(10);
    },500);
    
})


test("search for a user length for searched user should be matched",()=>{
    render(<AdminUi />);
    setTimeout(()=>{
        const searchElement=screen.getByPlaceholderText("Search by name, email or role");
        fireEvent.change(searchElement, { target: { value: 'seema' } });
        const tdElements=screen.getAllByRole("cell");
        const tdCount = tdElements.length;
        expect(tdCount).toBe(1);
    },500)
})




test("search for a user should fetch the user from data",()=>{
    render(<AdminUi />);
    setTimeout(()=>{
        const searchElement=screen.getByPlaceholderText("Search by name, email or role");
        fireEvent.change(searchElement, { target: { value: 'seema' } });
        const emailforUser=screen.getByText("seema@mailinator.com");
        expect(emailforUser).toBeInTheDocument();
    },500)
})




