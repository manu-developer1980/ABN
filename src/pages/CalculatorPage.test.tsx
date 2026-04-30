import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { CalculatorPage } from './CalculatorPage';

function renderCalculator() {
  return render(<CalculatorPage />);
}

describe('CalculatorPage', () => {
  it('shows validation error when operands are empty', async () => {
    const user = userEvent.setup();
    renderCalculator();
    await user.click(screen.getByRole('button', { name: /calcular/i }));
    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });

  it('renders first step after a valid calculation', async () => {
    const user = userEvent.setup();
    renderCalculator();
    await user.type(screen.getByLabelText(/primer sumando/i), '348');
    await user.type(screen.getByLabelText(/segundo sumando/i), '276');
    await user.click(screen.getByRole('button', { name: /calcular/i }));
    expect(
      await screen.findByRole('heading', { name: /descomponemos 276/i }),
    ).toBeInTheDocument();
  });

  it('advances and goes back between steps', async () => {
    const user = userEvent.setup();
    renderCalculator();
    await user.type(screen.getByLabelText(/primer sumando/i), '3');
    await user.type(screen.getByLabelText(/segundo sumando/i), '10');
    await user.click(screen.getByRole('button', { name: /calcular/i }));
    expect(
      await screen.findByRole('heading', { name: /descomponemos 10/i }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /siguiente/i }));
    expect(
      await screen.findByRole('heading', { name: /pasamos 10/i }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /anterior/i }));
    expect(
      screen.getByRole('heading', { name: /descomponemos 10/i }),
    ).toBeInTheDocument();
  });

  it('shows summary when toggling view all steps', async () => {
    const user = userEvent.setup();
    renderCalculator();
    await user.type(screen.getByLabelText(/primer sumando/i), '2');
    await user.type(screen.getByLabelText(/segundo sumando/i), '3');
    await user.click(screen.getByRole('button', { name: /calcular/i }));
    await screen.findByRole('heading', { name: /descomponemos 3/i });
    await user.click(screen.getByRole('button', { name: /ver todos los pasos/i }));
    expect(
      await screen.findByRole('heading', { name: /todos los pasos/i }),
    ).toBeInTheDocument();
  });

  it('rejects divisor cero en división', async () => {
    const user = userEvent.setup();
    renderCalculator();
    await user.selectOptions(screen.getByLabelText(/operación/i), 'division');
    await user.type(screen.getByLabelText(/dividendo/i), '10');
    await user.type(screen.getByLabelText(/divisor/i), '0');
    await user.click(screen.getByRole('button', { name: /calcular/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/divisor/i);
  });

});
