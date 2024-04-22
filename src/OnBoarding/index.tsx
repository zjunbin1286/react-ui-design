import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button, Popover } from 'antd';
import { Mask } from './Mask';
import { TooltipPlacement } from 'antd/es/tooltip';

export interface OnBoardingStepConfig {
  // 在哪个元素
  selector: () => HTMLElement | null;
  // 在什么方位
  placement?: TooltipPlacement;
  // 显示什么内容
  renderContent?: (currentStep: number) => React.ReactNode;
  // 上一步的回调
  beforeForward?: (currentStep: number) => void;
  // 下一步的回调
  beforeBack?: (currentStep: number) => void;
}

export interface OnBoardingProps {
  step?: number;
  steps: OnBoardingStepConfig[];
  getContainer?: () => HTMLElement;
  onStepsEnd?: () => void;
}

export const OnBoarding: FC<OnBoardingProps> = (props) => {
  const { step = 0, steps, onStepsEnd, getContainer } = props;

  const [currentStep, setCurrentStep] = useState<number>(0);

  const currentSelectedElement = steps[currentStep]?.selector();

  const currentContainerElement = getContainer?.() || document.documentElement;

  const [done, setDone] = useState(false);

  const [isMaskMoving, setIsMaskMoving] = useState<boolean>(false);

  const getCurrentStep = () => {
    return steps[currentStep];
  };

  const back = async () => {
    if (currentStep === 0) {
      return;
    }

    const { beforeBack } = getCurrentStep();
    await beforeBack?.(currentStep);
    setCurrentStep(currentStep - 1);
  };

  const forward = async () => {
    if (currentStep === steps.length - 1) {
      await onStepsEnd?.();
      setDone(true);
      return;
    }

    const { beforeForward } = getCurrentStep();
    await beforeForward?.(currentStep);
    setCurrentStep(currentStep + 1);
  };

  useEffect(() => {
    setCurrentStep(step!);
  }, [step]);

  const renderPopover = (wrapper: React.ReactNode) => {
    const config = getCurrentStep();

    if (!config) {
      return wrapper;
    }

    const { renderContent } = config;
    const content = renderContent ? renderContent(currentStep) : null;

    const operation = (
      <div className={'onboarding-operation'}>
        {currentStep !== 0 && (
          <Button className={'back'} onClick={() => back()}>
            {'上一步'}
          </Button>
        )}
        <Button
          className={'forward'}
          type={'primary'}
          onClick={() => forward()}
        >
          {currentStep === steps.length - 1 ? '我知道了' : '下一步'}
        </Button>
      </div>
    );

    return isMaskMoving ? (
      wrapper
    ) : (
      <Popover
        content={
          <div>
            {content}
            {operation}
          </div>
        }
        open={true}
        placement={getCurrentStep()?.placement}
      >
        {wrapper}
      </Popover>
    );
  };

  // 这里加个 setState，在 useEffect 里执行
  // 效果就是在 dom 渲染完之后，触发重新渲染，从而渲染这个 OnBoarding 组件
  const [, setRenderTick] = useState<number>(0);
  useEffect(() => {
    setRenderTick(1);
  }, []);

  // 第一次渲染的时候，元素是 null，触发重新渲染之后，就会渲染下面的 Mask 了
  if (!currentSelectedElement || done) {
    return null;
  }

  const mask = (
    <Mask
      onAnimationStart={() => {
        setIsMaskMoving(true);
      }}
      onAnimationEnd={() => {
        setIsMaskMoving(false);
      }}
      container={currentContainerElement}
      element={currentSelectedElement}
      renderMaskContent={(wrapper) => renderPopover(wrapper)}
    />
  );

  return createPortal(mask, currentContainerElement);
};
